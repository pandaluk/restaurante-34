import { Pagamento } from "@prisma/client";
import { IPagamentoRepository } from "@/interfaces/repositories/IPagamentoRepository";
import { PrismaClient } from "@prisma/client";

export default class PagamentoRepository implements IPagamentoRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }
    async create(pagamento: Pagamento): Promise<Pagamento> {
        try {
            const pagamentoResponse = await this.prismaClient.pagamento.create({
                data: {
                    statusPagamentoId: pagamento.statusPagamentoId,
                    pedidoId: pagamento.pedidoId,
                    tipo: pagamento.tipo,
                    data: pagamento.data,
                    valor: pagamento.valor
                }
            });
            return pagamentoResponse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async webhookUpdate(pagamentoId: number, status: number): Promise<Pagamento> {
        try {
            const pagamentoAtualizado = await this.prismaClient.pagamento.update({
                where: {
                    id: pagamentoId
                },
                data: {
                    statusPagamentoId: status
                }
            });
            return pagamentoAtualizado;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async get(pagamentoId: number): Promise<Pagamento> {
        try {
            const pagamento = await this.prismaClient.pagamento.findUniqueOrThrow({
                where: {
                    id: pagamentoId
                }
            });
            return pagamento;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}