import { z } from "zod";

export const petTypeEnum = z.enum(["cat", "dog"]);

export const petSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
    age: z.number().min(0, "A idade deve ser maior ou igual a 0").max(30, "A idade deve ser menor que 30"),
    type: petTypeEnum,
    breed: z.string().min(2, "A raça deve ter no mínimo 2 caracteres"),
    image: z.any().optional(),
    ownerName: z.string().min(2, "O nome do dono deve ter no mínimo 2 caracteres"),
    ownerContact: z.string().min(8, "O contato deve ter no mínimo 8 caracteres"),
    userId: z.string().optional(),
});

export type Pet = z.infer<typeof petSchema>;

export type PetFormData = Omit<Pet, "id">;

