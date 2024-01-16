import { Produto } from "@/entities/produto";
import { IProdutosDoPedidoRepository } from "@/old/core/ports/IProdutosDoPedidoRepository";
import { PrismaClient } from "@prisma/client";

class ProdutosDoPedido implements IProdutosDoPedidoRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async create(idPedido: number, produtos: Produto[]) {
        try {
            const response =
                await this.prismaClient.produtosDoPedido.createMany({
                    data: produtos.map(({ id, quantidade, valor }) => {
                        return {
                            pedidoId: idPedido,
                            produtoId: id,
                            quantidade: quantidade,
                            valor: valor,
                        };
                    }),
                });

            return response;
        } catch (error) {
            throw error;
        }
    }

    delete(idPedido: number, produtos: Produto[]) {
        return Promise.resolve({} as ProdutosDoPedido);
    }
}

export default ProdutosDoPedido;
