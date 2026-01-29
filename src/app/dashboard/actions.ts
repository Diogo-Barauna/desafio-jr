"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { petSchema, PetFormData, Pet } from "@/lib/validations/pet";

async function getSession() {
    return await auth.api.getSession({
        headers: await headers(),
    });
}

// ...

export async function getPets(search: string = "", typeFilter: string = "all") {
    const session = await getSession();
    if (!session) return [];

    const where: any = {};

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { ownerName: { contains: search, mode: "insensitive" } },
        ];
    }

    if (typeFilter !== "all" && (typeFilter === "dog" || typeFilter === "cat")) {
        where.type = typeFilter;
    }

    try {
        const pets = await prisma.pet.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        // Convert Bytes to Base64 string for frontend
        const mappedPets = pets.map(pet => ({
            ...pet,
            image: pet.image ? Buffer.from(pet.image).toString('base64') : null
        }));

        return mappedPets as unknown as Pet[];
    } catch (error) {
        console.error("Failed to fetch pets:", error);
        return [];
    }
}

export async function createPet(formData: FormData) {
    const session = await getSession();
    if (!session) {
        return { error: "Sem permissão" };
    }

    const rawData: Record<string, any> = {
        name: formData.get("name"),
        age: Number(formData.get("age")),
        type: formData.get("type"),
        breed: formData.get("breed"),
        ownerName: formData.get("ownerName"),
        ownerContact: formData.get("ownerContact"),
    };

    const imageFile = formData.get("image") as File | null;
    let imageBytes: Buffer | null = null;

    if (imageFile && imageFile.size > 0) {
        const arrayBuffer = await imageFile.arrayBuffer();
        imageBytes = Buffer.from(arrayBuffer);
    }

    const val = petSchema.omit({ id: true }).safeParse({ ...rawData, image: imageBytes }); // validate other fields

    if (!val.success) {
        return { error: "Dados inválidos: " + (val.error as any).errors?.[0]?.message || val.error.message };
    }

    try {
        await prisma.pet.create({
            data: {
                name: val.data.name,
                age: val.data.age,
                type: val.data.type,
                breed: val.data.breed,
                ownerName: val.data.ownerName,
                ownerContact: val.data.ownerContact,
                image: imageBytes as any,
                userId: session.user.id,
            },
        });
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to create pet:", error);
        return { error: "Erro ao criar pet" };
    }
}

export async function updatePet(id: string, formData: FormData) {
    const session = await getSession();
    if (!session) {
        return { error: "Sem permissão" };
    }

    const rawData: Record<string, any> = {
        name: formData.get("name"),
        age: Number(formData.get("age")),
        type: formData.get("type"),
        breed: formData.get("breed"),
        ownerName: formData.get("ownerName"),
        ownerContact: formData.get("ownerContact"),
    };

    const imageFile = formData.get("image") as File | null;
    let imageBytes: Buffer | null = null;

    // Check if new image provided
    if (imageFile && imageFile.size > 0) {
        const arrayBuffer = await imageFile.arrayBuffer();
        imageBytes = Buffer.from(arrayBuffer);
    }

    const val = petSchema.omit({ id: true }).safeParse({ ...rawData, image: imageBytes });

    if (!val.success) {
        return { error: "Dados inválidos" };
    }

    try {
        // Verify ownership
        const existing = await prisma.pet.findUnique({
            where: { id },
        });

        if (!existing || existing.userId !== session.user.id) {
            return { error: "Pet não encontrado ou sem permissão" };
        }

        const dataToUpdate: any = {
            name: val.data.name,
            age: val.data.age,
            type: val.data.type,
            breed: val.data.breed,
            ownerName: val.data.ownerName,
            ownerContact: val.data.ownerContact,
        };

        if (imageBytes) {
            dataToUpdate.image = imageBytes as any;
        }

        await prisma.pet.update({
            where: { id },
            data: dataToUpdate,
        });
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to update pet:", error);
        return { error: "Erro ao atualizar pet" };
    }
}

export async function deletePet(id: string) {
    const session = await getSession();
    if (!session) {
        return { error: "Sem permissão" };
    }

    try {
        // Verify ownership
        const existing = await prisma.pet.findUnique({
            where: { id },
        });

        if (!existing || existing.userId !== session.user.id) {
            return { error: "Pet não encontrado ou sem permissão" };
        }

        await prisma.pet.delete({
            where: { id },
        });
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete pet:", error);
        return { error: "Erro ao deletar pet" };
    }
}
