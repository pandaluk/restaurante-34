import { Pedido, Usuario } from "@prisma/client";

export interface Cliente {
    id: number;
    usuarioId: number;
    usuario: Usuario;
    pedido: Pedido[];
    nome: string | null;
    email: string;
    cpf: string;
    createdAt: Date;
    updatedAt: Date;
}
