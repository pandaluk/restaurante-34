import { Usuario } from "@prisma/client";

class Funcionario {
    constructor(
        public id: number,
        public nome: string,
        public cargo: string,
        public admin: boolean,
        public usuarioId: number,
        public usuario: Usuario,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}