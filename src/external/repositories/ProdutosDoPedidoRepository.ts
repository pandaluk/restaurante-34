

import { IProdutosDoPedidoRepository } from "@/interfaces";
import { IListaProdutosDoPedido } from "@/interfaces/entities/IListaProdutosDoPedido";

import { PrismaClient, ProdutosDoPedido } from "@prisma/client";

class ProdutosDoPedidoRepository implements IProdutosDoPedidoRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }    

    async create(idPedido: number, produtos: IListaProdutosDoPedido[]) {
        try {
            const response =
                await this.prismaClient.produtosDoPedido.createMany({
                    data: produtos.map(({ produtoId, quantidade, valor }) => {
                        return {
                            pedidoId: idPedido,
                            produtoId: produtoId,
                            quantidade: quantidade,
                            valor: valor,
                        };
                    }),
                });

            return response;
        } catch (error) {
            console.log(idPedido);
            console.log(error);
            throw error;
        }
    }

    async delete(idPedido: number, produtos: IListaProdutosDoPedido[]) {
        try {
            const response = produtos.map(async ({ produtoId }) => {
                await this.prismaClient.produtosDoPedido.deleteMany({
                    where: {
                        produtoId: produtoId,
                        pedidoId: idPedido
                    }
                });
            });
            return response;
        } catch(error) {
            throw error;
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
