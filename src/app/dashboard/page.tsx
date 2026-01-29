"use client";

import { useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { getPets, createPet, updatePet, deletePet } from "./actions";
import { petSchema, Pet, PetFormData } from "@/lib/validations/pet";
import { authClient } from "@/lib/auth-client";

// SVG Icons as components
const PlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const EditIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const TrashIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const PawIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 640 640" fill="currentColor">
        <path d="M298.5 156.9C312.8 199.8 298.2 243.1 265.9 253.7C233.6 264.3 195.8 238.1 181.5 195.2C167.2 152.3 181.8 109 214.1 98.4C246.4 87.8 284.2 114 298.5 156.9zM164.4 262.6C183.3 295 178.7 332.7 154.2 346.7C129.7 360.7 94.5 345.8 75.7 313.4C56.9 281 61.4 243.3 85.9 229.3C110.4 215.3 145.6 230.2 164.4 262.6zM133.2 465.2C185.6 323.9 278.7 288 320 288C361.3 288 454.4 323.9 506.8 465.2C510.4 474.9 512 485.3 512 495.7L512 497.3C512 523.1 491.1 544 465.3 544C453.8 544 442.4 542.6 431.3 539.8L343.3 517.8C328 514 312 514 296.7 517.8L208.7 539.8C197.6 542.6 186.2 544 174.7 544C148.9 544 128 523.1 128 497.3L128 495.7C128 485.3 129.6 474.9 133.2 465.2zM485.8 346.7C461.3 332.7 456.7 295 475.6 262.6C494.5 230.2 529.6 215.3 554.1 229.3C578.6 243.3 583.2 281 564.3 313.4C545.4 345.8 510.3 360.7 485.8 346.7zM374.1 253.7C341.8 243.1 327.2 199.8 341.5 156.9C355.8 114 393.6 87.8 425.9 98.4C458.2 109 472.8 152.3 458.5 195.2C444.2 238.1 406.4 264.3 374.1 253.7z" />
    </svg>
);

const UserIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const LogoutIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CatIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 640 640" fill="currentColor">
        <path d="M96 160C149 160 192 203 192 256L192 341.8C221.7 297.1 269.8 265.6 325.4 257.8C351 317.8 410.6 359.9 480 359.9C490.9 359.9 501.6 358.8 512 356.8L512 544C512 561.7 497.7 576 480 576C462.3 576 448 561.7 448 544L448 403.2L312 512L368 512C385.7 512 400 526.3 400 544C400 561.7 385.7 576 368 576L224 576C171 576 128 533 128 480L128 256C128 239.4 115.4 225.8 99.3 224.2L92.7 223.9C76.6 222.2 64 208.6 64 192C64 174.3 78.3 160 96 160zM565.8 67.2C576.2 58.5 592 65.9 592 79.5L592 192C592 253.9 541.9 304 480 304C418.1 304 368 253.9 368 192L368 79.5C368 65.9 383.8 58.5 394.2 67.2L448 112L512 112L565.8 67.2z" />
    </svg>
);

const DogIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 640 640" fill="currentColor">
        <path d="M64 176C80.6 176 94.2 188.6 95.8 204.7L96.1 211.3C97.8 227.4 111.4 240 128 240L307.1 240L448 300.4L448 544C448 561.7 433.7 576 416 576L384 576C366.3 576 352 561.7 352 544L352 412.7C328 425 300.8 432 272 432C243.2 432 216 425 192 412.7L192 544C192 561.7 177.7 576 160 576L128 576C110.3 576 96 561.7 96 544L96 298.4C58.7 285.2 32 249.8 32 208C32 190.3 46.3 176 64 176zM387.8 32C395.5 32 402.7 35.6 407.4 41.8L424 64L476.1 64C488.8 64 501 69.1 510 78.1L528 96L584 96C597.3 96 608 106.7 608 120L608 144C608 188.2 572.2 224 528 224L464 224L457 252L332.3 198.6L363.9 51.4C366.3 40.1 376.2 32 387.8 32zM480 108C469 108 460 117 460 128C460 139 469 148 480 148C491 148 500 139 500 128C500 117 491 108 480 108z" />
    </svg>
);

// Form schema without ID for create/edit
const petFormSchema = petSchema.omit({ id: true });

// Standalone component to avoid uncontrolled input state loss on re-renders
const PetForm = ({
    form,
    onSubmit,
    submitLabel
}: {
    form: UseFormReturn<PetFormData>,
    onSubmit: (data: PetFormData) => void;
    submitLabel: string
}) => (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="image">Foto do Pet</Label>
            <Input
                id="image"
                type="file"
                accept="image/*"
                {...form.register("image")}
                className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50 cursor-pointer file:cursor-pointer file:text-amber-600 file:border-0 file:bg-transparent file:font-semibold"
            />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nome do Pet</Label>
                <Input
                    id="name"
                    placeholder="Ex: Rex"
                    {...form.register("name")}
                    className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50"
                />
                {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="age">Idade (anos)</Label>
                <Input
                    id="age"
                    type="number"
                    placeholder="Ex: 3"
                    {...form.register("age", { valueAsNumber: true })}
                    className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50"
                />
                {form.formState.errors.age && (
                    <p className="text-sm text-red-500">{form.formState.errors.age.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select
                    value={form.watch("type")}
                    onValueChange={(value) => form.setValue("type", value as "cat" | "dog")}
                >
                    <SelectTrigger className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50 cursor-pointer">
                        <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="dog" className="cursor-pointer">Cachorro</SelectItem>
                        <SelectItem value="cat" className="cursor-pointer">Gato</SelectItem>
                    </SelectContent>
                </Select>
                {form.formState.errors.type && (
                    <p className="text-sm text-red-500">{form.formState.errors.type.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="breed">Raça</Label>
                <Input
                    id="breed"
                    placeholder="Ex: Labrador"
                    {...form.register("breed")}
                    className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50"
                />
                {form.formState.errors.breed && (
                    <p className="text-sm text-red-500">{form.formState.errors.breed.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="ownerName">Seu Nome</Label>
                <Input
                    id="ownerName"
                    placeholder="Ex: João Silva"
                    {...form.register("ownerName")}
                    className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50"
                />
                {form.formState.errors.ownerName && (
                    <p className="text-sm text-red-500">{form.formState.errors.ownerName.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="ownerContact">Seu Contato</Label>
                <Input
                    id="ownerContact"
                    placeholder="Ex: (11) 99999-9999"
                    {...form.register("ownerContact")}
                    className="bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50"
                />
                {form.formState.errors.ownerContact && (
                    <p className="text-sm text-red-500">{form.formState.errors.ownerContact.message}</p>
                )}
            </div>
        </div>

        <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2.5 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {form.formState.isSubmitting ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Salvando...
                </>
            ) : submitLabel}
        </Button>
    </form>
);

export default function DashboardPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [pets, setPets] = useState<Pet[]>([]);
    const [isLoadingPets, setIsLoadingPets] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<"all" | "dog" | "cat">("all");

    // Redirect to auth if not logged in
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/auth");
        }
    }, [session, isPending, router]);

    // Fetch pets
    const fetchPets = async () => {
        setIsLoadingPets(true);
        try {
            const data = await getPets(searchTerm, typeFilter);
            setPets(data);
        } catch (error) {
            console.error("Failed to load pets", error);
        } finally {
            setIsLoadingPets(false);
        }
    };

    useEffect(() => {
        if (session) {
            fetchPets();
        }
    }, [session, searchTerm, typeFilter]);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/auth";
                },
            },
        });
    };

    // Replace filteredPets logic with just 'pets' since filtering handles in backend
    // But wait, the previous code filtered client side.
    // My getPets action handles filtering.
    // So 'pets' state is already filtered.
    const filteredPets = pets;

    const onCreateSubmit = async (data: PetFormData) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("age", String(data.age));
        formData.append("type", data.type);
        formData.append("breed", data.breed);
        formData.append("ownerName", data.ownerName);
        formData.append("ownerContact", data.ownerContact);

        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        const result = await createPet(formData);
        if (result.success) {
            setIsCreateOpen(false);
            fetchPets();
        } else {
            alert(result.error || "Erro ao criar pet");
        }
    };

    const onEditSubmit = async (data: PetFormData) => {
        if (!selectedPet?.id) return;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("age", String(data.age));
        formData.append("type", data.type);
        formData.append("breed", data.breed);
        formData.append("ownerName", data.ownerName);
        formData.append("ownerContact", data.ownerContact);

        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        const result = await updatePet(selectedPet.id, formData);
        if (result.success) {
            setIsEditOpen(false);
            setSelectedPet(null);
            fetchPets();
        } else {
            alert(result.error || "Erro ao editar pet");
        }
    };

    const onDelete = async () => {
        if (!selectedPet?.id) return;
        const result = await deletePet(selectedPet.id);
        if (result.success) {
            setIsDeleteOpen(false);
            setSelectedPet(null);
            fetchPets();
        } else {
            alert(result.error || "Erro ao deletar pet");
        }
    };

    const form = useForm<PetFormData>({
        resolver: zodResolver(petFormSchema),
        defaultValues: {
            name: "",
            age: 0,
            type: "dog",
            breed: "",
            ownerName: "",
            ownerContact: "",
        },
    });

    const resetForm = () => {
        form.reset({
            name: "",
            age: 0,
            type: "dog",
            breed: "",
            ownerName: "",
            ownerContact: "",
        });
    };



    const openEditModal = (pet: Pet) => {
        setSelectedPet(pet);
        form.reset({
            name: pet.name,
            age: pet.age,
            type: pet.type as "cat" | "dog",
            breed: pet.breed,
            // image is file input, hard to preset value without custom component
            ownerName: pet.ownerName,
            ownerContact: pet.ownerContact,
        });
        setIsEditOpen(true);
    };

    const openDeleteModal = (pet: Pet) => {
        setSelectedPet(pet);
        setIsDeleteOpen(true);
    };



    // Show loading while checking session
    if (isPending) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white animate-pulse">
                        <PawIcon />
                    </div>
                    <p className="text-muted-foreground">Carregando...</p>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated
    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden">
            {/* Decorative background icons */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Blur circles */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/30 dark:bg-orange-900/20 rounded-full blur-3xl" />

                {/* Bird icon - top left */}
                <svg className="absolute top-[10%] left-[5%] w-16 h-16 text-amber-300/40 dark:text-amber-700/30 rotate-12" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M64 176C80.6 176 94.2 188.6 95.8 204.7L96.1 211.3C97.8 227.4 111.4 240 128 240L307.1 240L448 300.4L448 544C448 561.7 433.7 576 416 576L384 576C366.3 576 352 561.7 352 544L352 412.7C328 425 300.8 432 272 432C243.2 432 216 425 192 412.7L192 544C192 561.7 177.7 576 160 576L128 576C110.3 576 96 561.7 96 544L96 298.4C58.7 285.2 32 249.8 32 208C32 190.3 46.3 176 64 176zM387.8 32C395.5 32 402.7 35.6 407.4 41.8L424 64L476.1 64C488.8 64 501 69.1 510 78.1L528 96L584 96C597.3 96 608 106.7 608 120L608 144C608 188.2 572.2 224 528 224L464 224L457 252L332.3 198.6L363.9 51.4C366.3 40.1 376.2 32 387.8 32zM480 108C469 108 460 117 460 128C460 139 469 148 480 148C491 148 500 139 500 128C500 117 491 108 480 108z" />
                </svg>

                {/* Cat icon - top right */}
                <svg className="absolute top-[15%] right-[8%] w-20 h-20 text-orange-300/35 dark:text-orange-700/25 -rotate-6" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M96 160C149 160 192 203 192 256L192 341.8C221.7 297.1 269.8 265.6 325.4 257.8C351 317.8 410.6 359.9 480 359.9C490.9 359.9 501.6 358.8 512 356.8L512 544C512 561.7 497.7 576 480 576C462.3 576 448 561.7 448 544L448 403.2L312 512L368 512C385.7 512 400 526.3 400 544C400 561.7 385.7 576 368 576L224 576C171 576 128 533 128 480L128 256C128 239.4 115.4 225.8 99.3 224.2L92.7 223.9C76.6 222.2 64 208.6 64 192C64 174.3 78.3 160 96 160zM565.8 67.2C576.2 58.5 592 65.9 592 79.5L592 192C592 253.9 541.9 304 480 304C418.1 304 368 253.9 368 192L368 79.5C368 65.9 383.8 58.5 394.2 67.2L448 112L512 112L565.8 67.2zM432 172C421 172 412 181 412 192C412 203 421 212 432 212C443 212 452 203 452 192C452 181 443 172 432 172zM528 172C517 172 508 181 508 192C508 203 517 212 528 212C539 212 548 203 548 192C548 181 539 172 528 172z" />
                </svg>

                {/* Fish icon - middle left */}
                <svg className="absolute top-[45%] left-[3%] w-14 h-14 text-amber-400/30 dark:text-amber-600/20 rotate-45" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M212.5 205.5C251.7 172.5 304.6 144 368 144C431.4 144 484.3 172.5 523.5 205.5C562.6 238.5 590.4 277.9 604.5 305.3C609.2 314.5 609.2 325.4 604.5 334.6C590.4 362 562.6 401.4 523.5 434.4C484.3 467.5 431.5 495.9 368 495.9C304.5 495.9 251.7 467.4 212.5 434.4C196.3 420.7 182 405.9 169.8 391.3L80.1 443.6C67.6 450.9 51.7 448.9 41.4 438.7C31.1 428.5 29 412.7 36.1 400.1L82 320L36.2 239.9C29 227.3 31.2 211.5 41.5 201.3C51.8 191.1 67.6 189.1 80.2 196.4L169.9 248.7C182.1 234.1 196.4 219.3 212.6 205.6zM480 320C480 302.3 465.7 288 448 288C430.3 288 416 302.3 416 320C416 337.7 430.3 352 448 352C465.7 352 480 337.7 480 320z" />
                </svg>

                {/* Bone icon - bottom left */}
                <svg className="absolute bottom-[18%] left-[10%] w-24 h-24 text-orange-200/40 dark:text-orange-800/25 -rotate-45" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M197.4 224C193.5 224 190.2 221.2 189.3 217.4C179.1 175.3 141.2 144 96 144C43 144 0 187 0 240C0 269.1 12.9 295.1 33.3 312.7C37.6 316.4 37.6 323.5 33.3 327.2C12.9 344.8 0 370.9 0 399.9C0 452.9 43 495.9 96 495.9C141.2 495.9 179.1 464.6 189.3 422.5C190.2 418.7 193.5 415.9 197.4 415.9L442.5 415.9C446.4 415.9 449.7 418.7 450.6 422.5C460.8 464.6 498.7 495.9 543.9 495.9C596.9 495.9 639.9 452.9 639.9 399.9C639.9 370.8 627 344.8 606.6 327.2C602.3 323.5 602.3 316.4 606.6 312.7C627 295.1 639.9 269 639.9 240C639.9 187 596.9 144 543.9 144C498.7 144 460.8 175.3 450.6 217.4C449.7 221.2 446.4 224 442.5 224L197.4 224z" />
                </svg>

                {/* Bird icon - bottom right */}
                <svg className="absolute bottom-[12%] right-[5%] w-12 h-12 text-amber-300/35 dark:text-amber-700/20 rotate-[-20deg]" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M64 176C80.6 176 94.2 188.6 95.8 204.7L96.1 211.3C97.8 227.4 111.4 240 128 240L307.1 240L448 300.4L448 544C448 561.7 433.7 576 416 576L384 576C366.3 576 352 561.7 352 544L352 412.7C328 425 300.8 432 272 432C243.2 432 216 425 192 412.7L192 544C192 561.7 177.7 576 160 576L128 576C110.3 576 96 561.7 96 544L96 298.4C58.7 285.2 32 249.8 32 208C32 190.3 46.3 176 64 176zM387.8 32C395.5 32 402.7 35.6 407.4 41.8L424 64L476.1 64C488.8 64 501 69.1 510 78.1L528 96L584 96C597.3 96 608 106.7 608 120L608 144C608 188.2 572.2 224 528 224L464 224L457 252L332.3 198.6L363.9 51.4C366.3 40.1 376.2 32 387.8 32zM480 108C469 108 460 117 460 128C460 139 469 148 480 148C491 148 500 139 500 128C500 117 491 108 480 108z" />
                </svg>

                {/* Cat icon - middle right */}
                <svg className="absolute top-[55%] right-[4%] w-18 h-18 text-orange-400/25 dark:text-orange-600/15 rotate-12" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M96 160C149 160 192 203 192 256L192 341.8C221.7 297.1 269.8 265.6 325.4 257.8C351 317.8 410.6 359.9 480 359.9C490.9 359.9 501.6 358.8 512 356.8L512 544C512 561.7 497.7 576 480 576C462.3 576 448 561.7 448 544L448 403.2L312 512L368 512C385.7 512 400 526.3 400 544C400 561.7 385.7 576 368 576L224 576C171 576 128 533 128 480L128 256C128 239.4 115.4 225.8 99.3 224.2L92.7 223.9C76.6 222.2 64 208.6 64 192C64 174.3 78.3 160 96 160zM565.8 67.2C576.2 58.5 592 65.9 592 79.5L592 192C592 253.9 541.9 304 480 304C418.1 304 368 253.9 368 192L368 79.5C368 65.9 383.8 58.5 394.2 67.2L448 112L512 112L565.8 67.2zM432 172C421 172 412 181 412 192C412 203 421 212 432 212C443 212 452 203 452 192C452 181 443 172 432 172zM528 172C517 172 508 181 508 192C508 203 517 212 528 212C539 212 548 203 548 192C548 181 539 172 528 172z" />
                </svg>

                {/* Fish icon - top center */}
                <svg className="absolute top-[5%] left-[40%] w-10 h-10 text-amber-200/35 dark:text-amber-800/20 -rotate-12" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M212.5 205.5C251.7 172.5 304.6 144 368 144C431.4 144 484.3 172.5 523.5 205.5C562.6 238.5 590.4 277.9 604.5 305.3C609.2 314.5 609.2 325.4 604.5 334.6C590.4 362 562.6 401.4 523.5 434.4C484.3 467.5 431.5 495.9 368 495.9C304.5 495.9 251.7 467.4 212.5 434.4C196.3 420.7 182 405.9 169.8 391.3L80.1 443.6C67.6 450.9 51.7 448.9 41.4 438.7C31.1 428.5 29 412.7 36.1 400.1L82 320L36.2 239.9C29 227.3 31.2 211.5 41.5 201.3C51.8 191.1 67.6 189.1 80.2 196.4L169.9 248.7C182.1 234.1 196.4 219.3 212.6 205.6zM480 320C480 302.3 465.7 288 448 288C430.3 288 416 302.3 416 320C416 337.7 430.3 352 448 352C465.7 352 480 337.7 480 320z" />
                </svg>

                {/* Bone icon - bottom center */}
                <svg className="absolute bottom-[5%] left-[55%] w-16 h-16 text-orange-300/30 dark:text-orange-700/20 rotate-30" viewBox="0 0 640 640" fill="currentColor">
                    <path d="M197.4 224C193.5 224 190.2 221.2 189.3 217.4C179.1 175.3 141.2 144 96 144C43 144 0 187 0 240C0 269.1 12.9 295.1 33.3 312.7C37.6 316.4 37.6 323.5 33.3 327.2C12.9 344.8 0 370.9 0 399.9C0 452.9 43 495.9 96 495.9C141.2 495.9 179.1 464.6 189.3 422.5C190.2 418.7 193.5 415.9 197.4 415.9L442.5 415.9C446.4 415.9 449.7 418.7 450.6 422.5C460.8 464.6 498.7 495.9 543.9 495.9C596.9 495.9 639.9 452.9 639.9 399.9C639.9 370.8 627 344.8 606.6 327.2C602.3 323.5 602.3 316.4 606.6 312.7C627 295.1 639.9 269 639.9 240C639.9 187 596.9 144 543.9 144C498.7 144 460.8 175.3 450.6 217.4C449.7 221.2 446.4 224 442.5 224L197.4 224z" />
                </svg>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border-b border-amber-200/50 dark:border-amber-800/30">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white">
                            <PawIcon />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                            InteraTo PetShop
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Dialog open={isCreateOpen} onOpenChange={(open) => { setIsCreateOpen(open); if (!open) resetForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all gap-2">
                                    <PlusIcon />
                                    <span className="hidden sm:inline">Cadastrar Pet</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-amber-200/50 dark:border-amber-800/30 max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                                        Cadastrar Meu Pet
                                    </DialogTitle>
                                    <DialogDescription>
                                        Compartilhe seu pet com a comunidade!
                                    </DialogDescription>
                                </DialogHeader>
                                <PetForm form={form} onSubmit={onCreateSubmit} submitLabel="Publicar" />
                            </DialogContent>
                        </Dialog>

                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full cursor-pointer p-0">
                                    <Avatar className="h-10 w-10 border-2 border-amber-200 dark:border-amber-800 bg-amber-100 dark:bg-amber-900/30">
                                        {session?.user?.image && (
                                            <AvatarImage src={session.user.image} alt={session.user.name || ""} />
                                        )}
                                        <AvatarFallback className="bg-transparent text-amber-600 dark:text-amber-400">
                                            {session?.user?.name?.charAt(0).toUpperCase() || <UserIcon />}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session?.user?.name || "Usuário"}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session?.user?.email || ""}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10" onClick={handleLogout}>
                                    <div className="mr-2">
                                        <LogoutIcon />
                                    </div>
                                    <span>Sair</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative max-w-6xl mx-auto px-4 py-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <SearchIcon />
                        </div>
                        <Input
                            placeholder="Buscar por pet ou dono..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50 focus-visible:ring-amber-500"
                        />
                    </div>
                    <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as any)}>
                        <SelectTrigger className="w-full md:w-[200px] bg-white/50 dark:bg-zinc-800/50 border-amber-200 dark:border-amber-800/50 cursor-pointer">
                            <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" className="cursor-pointer">Todos os Pets</SelectItem>
                            <SelectItem value="dog" className="cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <DogIcon />
                                    <span>Cachorros</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="cat" className="cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <CatIcon />
                                    <span>Gatos</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Pet Feed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPets.map((pet) => (
                        <Card
                            key={pet.id}
                            className={`group overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 p-0 gap-0
                                ${pet.userId === session?.user?.id
                                    ? "border-amber-400 dark:border-amber-600 shadow-md ring-1 ring-amber-400/50 dark:ring-amber-600/50"
                                    : "border-amber-200/50 dark:border-amber-800/30 hover:shadow-xl"
                                }
                            `}
                        >
                            {/* Pet Image */}
                            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                                {pet.image ? (
                                    <Image
                                        src={`data:image/jpeg;base64,${pet.image}`}
                                        alt={pet.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-amber-400/50">
                                        <svg className="w-24 h-24" viewBox="0 0 640 640" fill="currentColor">
                                            <path d="M298.5 156.9C312.8 199.8 298.2 243.1 265.9 253.7C233.6 264.3 195.8 238.1 181.5 195.2C167.2 152.3 181.8 109 214.1 98.4C246.4 87.8 284.2 114 298.5 156.9zM164.4 262.6C183.3 295 178.7 332.7 154.2 346.7C129.7 360.7 94.5 345.8 75.7 313.4C56.9 281 61.4 243.3 85.9 229.3C110.4 215.3 145.6 230.2 164.4 262.6zM133.2 465.2C185.6 323.9 278.7 288 320 288C361.3 288 454.4 323.9 506.8 465.2C510.4 474.9 512 485.3 512 495.7L512 497.3C512 523.1 491.1 544 465.3 544C453.8 544 442.4 542.6 431.3 539.8L343.3 517.8C328 514 312 514 296.7 517.8L208.7 539.8C197.6 542.6 186.2 544 174.7 544C148.9 544 128 523.1 128 497.3L128 495.7C128 485.3 129.6 474.9 133.2 465.2zM485.8 346.7C461.3 332.7 456.7 295 475.6 262.6C494.5 230.2 529.6 215.3 554.1 229.3C578.6 243.3 583.2 281 564.3 313.4C545.4 345.8 510.3 360.7 485.8 346.7zM374.1 253.7C341.8 243.1 327.2 199.8 341.5 156.9C355.8 114 393.6 87.8 425.9 98.4C458.2 109 472.8 152.3 458.5 195.2C444.2 238.1 406.4 264.3 374.1 253.7z" />
                                        </svg>
                                    </div>
                                )}

                                {/* Type Badge */}
                                <Badge
                                    className={`absolute top-3 right-3 ${pet.type === "dog" ? "bg-orange-500" : "bg-amber-500"} text-white shadow-lg`}
                                >
                                    {pet.type === "dog" ? "Cachorro" : "Gato"}
                                </Badge>

                                {/* My Pet Badge - Only for owner */}
                                {pet.userId === session?.user?.id && (
                                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                                        <UserIcon />
                                        <span>Meu Pet</span>
                                    </div>
                                )}

                                {/* Action Buttons - visible on hover (desktop) / always visible (mobile) */}
                                {pet.userId === session?.user?.id && (
                                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="cursor-pointer w-8 h-8 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 shadow-lg"
                                            onClick={() => openEditModal(pet)}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="cursor-pointer w-8 h-8 bg-white/90 dark:bg-zinc-800/90 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 shadow-lg"
                                            onClick={() => openDeleteModal(pet)}
                                        >
                                            <TrashIcon />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Pet Info */}
                            <CardContent className="p-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                                    {pet.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                    {pet.breed} • {pet.age} {pet.age === 1 ? "ano" : "anos"}
                                </p>

                                {/* Owner Info */}
                                <div className="flex items-center gap-2 pt-3 border-t border-amber-100 dark:border-amber-900/30">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                                        {pet.ownerName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{pet.ownerName}</p>
                                        <p className="text-xs text-muted-foreground truncate">{pet.ownerContact}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPets.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 text-amber-300">
                            <PawIcon />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {pets.length === 0 ? "Nenhum pet cadastrado" : "Nenhum pet encontrado"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            {pets.length === 0
                                ? "Seja o primeiro a compartilhar seu pet com a comunidade!"
                                : "Tente ajustar seus filtros ou busca."}
                        </p>
                        {pets.length === 0 && (
                            <Button
                                onClick={() => setIsCreateOpen(true)}
                                className="cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all gap-2"
                            >
                                <PlusIcon />
                                Cadastrar Pet
                            </Button>
                        )}
                    </div>
                )}
            </main>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if (!open) { setSelectedPet(null); resetForm(); } }}>
                <DialogContent className="sm:max-w-lg bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-amber-200/50 dark:border-amber-800/30 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                            Editar Pet
                        </DialogTitle>
                        <DialogDescription>
                            Atualize as informações do seu pet.
                        </DialogDescription>
                    </DialogHeader>
                    <PetForm form={form} onSubmit={onEditSubmit} submitLabel="Salvar Alterações" />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-amber-200/50 dark:border-amber-800/30">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remover Pet</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja remover <strong>{selectedPet?.name}</strong> da comunidade? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className="cursor-pointer bg-red-500 hover:bg-red-600"
                            onClick={onDelete}
                        >
                            Remover
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
