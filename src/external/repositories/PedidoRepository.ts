
import { Pedido } from "@/entities/Pedido";
import { IPedidoRepository } from "@/interfaces";
import { PrismaClient } from "@prisma/client";

class PedidoRepository implements IPedidoRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async create(pedido: Pedido): Promise<Pedido> {
        try {
            const creationResponse = await this.prismaClient.pedido.create({
                data: {
                    statusPedidoId: pedido.statusPedidoId,
                    clienteId: pedido.clienteId,
                },
            });

            return creationResponse as Pedido;
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            throw new Error("Erro ao criar pedido.");
        }
    }

    async getPedidoById(id: number): Promise<Pedido> {
        try {
            const pedido = await this.prismaClient.pedido.findUnique({
                where: {
                    id: id,
                },
            });
            return pedido as Pedido;
        } catch (error: any) {
            console.error("Erro ao buscar pedido:", error);
            throw new Error("Erro ao buscar pedido.");
        }
    }

    async getPedidos(): Promise<Pedido[]> {
        try {
            const pedidosSemConverter = await this.prismaClient.pedido.findMany({
                include: {
                    statusPedido: {
                        select: {
                            id: true,
                            enumerador: true,
                        },
                    },
                    cliente: {
                        select: {
                            nome: true,
                        },
                    },
                },
            });

            const pedidosUnknown: unknown = pedidosSemConverter;
            const pedidosConvertidos = pedidosUnknown as Pedido[];

            return pedidosConvertidos;
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            throw new Error("Erro ao buscar pedidos.");
        }
    }

    async getPedidosByStatus(idStatusPedido: number): Promise<Pedido[]> {
        try {
            const pedidosSemConverter = await this.prismaClient.pedido.findMany({
                where: {
                    statusPedido: {
                        id: idStatusPedido,
                    },
                },
                include: {
                    cliente: {
                        select: {
                            nome: true,
                        },
                    },
                    statusPedido: {
                        select: {
                            enumerador: true,
                        },
                    },
                },
            });

            const pedidosUnknown: unknown = pedidosSemConverter;
            const pedidosConvertidos = pedidosUnknown as Pedido[];

            return pedidosConvertidos;
        } catch (error) {
            console.error("Erro ao buscar pedidos por status:", error);
            throw new Error("Erro ao buscar pedidos por status.");
        }
    }

    async getPedidoByStatusFakeCheckout(status: string): Promise<Pedido[]> {
        try {
            const pedidosSemConverter = await this.prismaClient.pedido.findMany({
                where: {
                    statusPedido: {
                        enumerador: {
                            startsWith: status,
                        },
                    },
                },
                include: {
                    cliente: {
                        select: {
                            nome: true,
                        },
                    },
                    statusPedido: {
                        select: {
                            enumerador: true,
                        },
                    },
                },
            });
            const pedidosUnknown: unknown = pedidosSemConverter;
            const pedidosConvertidos = pedidosUnknown as Pedido[];

            return pedidosConvertidos;
        } catch (error) {
            console.error("Erro ao buscar pedidos por status:", error);
            throw new Error("Erro ao buscar pedidos por status.");
        }
    }

    async updatePedido(id: number, status: string): Promise<Pedido> {
        try {
            const pedidoResponse = await this.prismaClient.pedido.update({
                where: {
                    id: id,
                },
                data: {
                    statusPedido: {
                        connect: {
                            enumerador: status,
                        },
                    },
                },
            });
            return pedidoResponse as Pedido;
            
        } catch (error) {
            console.error("Erro ao buscar pedidos por status:", error);
            throw new Error("Erro ao buscar pedidos por status.");
        }
    }

    

    
}

export default PedidoRepository;
