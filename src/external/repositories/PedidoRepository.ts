
import { IPedidoRepository } from "@/interfaces";
import { Pedido, PrismaClient } from "@prisma/client";

class PedidoRepository implements IPedidoRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async create(pedido: Pedido) {
        try {
            const pedidoResponse = await this.prismaClient.pedido.create({
                data: {
                    statusPedidoId: pedido.statusPedidoId,
                    clienteId: pedido.clienteId,
                },
            });

            return pedidoResponse;
        } catch (error) {
            throw error;
        }
    }
    async getPedidoById(id: number) {
        try {
            const pedidoResponse = await this.prismaClient.pedido.findUnique({
                where: {
                    id: id,
                },
            });
            return pedidoResponse || ({} as Pedido);
        } catch (error) {
            throw error;
        }
    }
    async getPedidos() {
        try {
            const pedidoResponse = await this.prismaClient.pedido.findMany({
                include: {
                    statusPedido: {
                        select: {
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
            return pedidoResponse;
        } catch (error) {
            throw error;
        }
    }

    async updatePedido(id: number, status: string) {
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

            return pedidoResponse;
        } catch (error) {
            throw error;
        }
    }

    async getPedidosByStatus(status: string) {
        try {
            const pedidoResponse = await this.prismaClient.pedido.findMany({
                where: {
                    statusPedido: {
                        enumerador: {
                            equals: status,
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
            return pedidoResponse;
        } catch (error) {
            throw error;
        }
    }

    async getPedidoByStatusFakeCheckout(status: string) {
        try {
            const pedidoResponse = await this.prismaClient.pedido.findMany({
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
            return pedidoResponse;
        } catch (error) {
            throw error;
        }
    }
}

export default PedidoRepository;
