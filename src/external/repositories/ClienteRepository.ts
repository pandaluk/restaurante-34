import Cliente from "@/entities/Cliente";
import { IClienteRepository } from "@/interfaces";
import { PrismaClient } from "@prisma/client";

class ClienteRepository implements IClienteRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async create(cliente: Cliente): Promise<Cliente> {
        try {
            const creationResponse = await this.prismaClient.cliente.create({
                data: {
                    nome: cliente.nome,
                    cpf: cliente.cpf,
                    email: cliente.email,
                    usuario: {
                        create: {
                            tipoAcesso: "cliente",
                            login: cliente.usuario.login,
                            senha: cliente.usuario.senha,
                        },
                    },
                },
            });

            return {
                id: creationResponse.id,
                nome: creationResponse.nome,
                cpf: creationResponse.cpf,
                email: creationResponse.email,
                usuarioId: creationResponse.usuarioId,
                usuario: {
                    login: ``,
                    senha: ``,
                },
                pedido: [],
                createdAt: creationResponse.createdAt,
                updatedAt: creationResponse.updatedAt,
            } as Cliente;
        } catch (error) {
            throw error;
        }
    }

    async getByCpf(cpf: string): Promise<Cliente> {
        const foundCliente = await this.prismaClient.cliente.findUnique({
            where: {
                cpf: cpf,
            },
        });

        if (!foundCliente) {
            throw new Error("Cliente não encontrado");
        }

        return {
            id: foundCliente.id,
            nome: foundCliente.nome,
            cpf: foundCliente.cpf,
            email: foundCliente.email,
            usuarioId: foundCliente.usuarioId,
            usuario: {
                login: ``,
                senha: ``,
            },
            pedido: [],
            createdAt: foundCliente.createdAt,
            updatedAt: foundCliente.updatedAt,
        } as Cliente;
    }

    async getById(id: number): Promise<Cliente> {
        const foundCliente = await this.prismaClient.cliente.findUnique({
            where: {
                id: id,
            },
        });

        if (!foundCliente) {
            throw new Error("Cliente não encontrado");
        }

        return {
            id: foundCliente.id,
            nome: foundCliente.nome,
            cpf: foundCliente.cpf,
            email: foundCliente.email,
            usuarioId: foundCliente.usuarioId,
            usuario: {
                login: ``,
                senha: ``,
            },
            pedido: [],
            createdAt: foundCliente.createdAt,
            updatedAt: foundCliente.updatedAt,
        } as Cliente;
    }
}

export default ClienteRepository;
