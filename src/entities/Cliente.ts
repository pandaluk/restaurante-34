import { Pedido } from "./Pedido";

class Cliente {
    pedido: Pedido[] | null;
    nome: string | null;
    email: string;
    cpf: string;
    usuario: {
        login: string;
        senha: string;
    } = {
        login: "",
        senha: "",
    };
    createdAt: Date;
    updatedAt: Date;
    usuarioId: number | null;

    constructor(
        pedido: Pedido[] | null,
        usuarioId: number | null,
        usuario: {
            login: string;
            senha: string;
        },
        nome: string | null,
        email: string,
        cpf: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.pedido = pedido;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.createdAt = createdAt;
        this.usuario = usuario;
        this.updatedAt = updatedAt;
        this.usuarioId = usuarioId;
    }
}

export default Cliente;
