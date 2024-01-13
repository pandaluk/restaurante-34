import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { IProdutosDoPedidoRepository } from "@/interfaces";

import { PrismaClient } from "@prisma/client";

class ProdutosDoPedidoRepository implements IProdutosDoPedidoRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async create(idPedido: number, produtos: ProdutosDoPedido[]) {
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
            console.log(idPedido)
            console.log(error)
            throw error;
        }
    }

    async delete(idPedido: number, produtos: ProdutosDoPedido[]) {
        try {
            const response = produtos.map(async ({ id }) => {
                await this.prismaClient.produtosDoPedido.deleteMany({
                    where: {
                        produtoId: id,
                        pedidoId: idPedido
                    }
                })
            })
            return response
        } catch(error) {
            throw error
        }
    }
}

export default ProdutosDoPedidoRepository;
