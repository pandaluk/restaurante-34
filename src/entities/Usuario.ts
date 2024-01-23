import { Funcionario } from "@prisma/client";
import Cliente from "./Cliente";

class Usuario {
    constructor(
        public id: number,
        public tipoAcesso: TipoAcesso,
        public login: string,
        public senha: string,
        public createdAt: Date,
        public updatedAt: Date,
        public funcionario?: Funcionario,
        public cliente?:Cliente,
    ) {}
}