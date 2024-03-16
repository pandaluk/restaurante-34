

import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { IProdutosDoPedidoRepository } from "@/interfaces";
import { IListaProdutosDoPedido } from "@/interfaces/entities/IListaProdutosDoPedido";

import { PrismaClient } from "@prisma/client";

class ProdutosDoPedidoRepository implements IProdutosDoPedidoRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }    

    async create(produtosDoPedido: ProdutosDoPedido[]): Promise<any> {
        try {
            const response = await this.prismaClient.produtosDoPedido.createMany({
                data: produtosDoPedido.map(({ pedidoId, produtoId, quantidade, valor }) => {
                    return {
                        pedidoId: pedidoId,
                        produtoId: produtoId,
                        quantidade: quantidade,
                        valor: valor,
                    };
                }),
            });

            return response;
        } catch (error) {
            console.error("Erro ao adicionar produto(s) no pedido:", error);
            throw new Error("Erro ao adicionar produto(s) no pedido.");
        }
    }

    async delete(produtosDoPedido: ProdutosDoPedido[]) {
        try {
            const response = produtosDoPedido.map(async ({ produtoId, pedidoId }) => {
                await this.prismaClient.produtosDoPedido.deleteMany({
                    where: {
                        produtoId: produtoId,
                        pedidoId: pedidoId
                    }
                });
            });
            return response;
        } catch(error) {
            console.error("Erro ao remover produto(s) no pedido:", error);
            throw new Error("Erro ao remover produto(s) no pedido.");
        }
    }

    async get(idPedido: number): Promise<any> {
        try {
            const response = await this.prismaClient.produtosDoPedido.findMany({
                where: {
                    pedidoId: idPedido
                }
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ProdutosDoPedidoRepository;
