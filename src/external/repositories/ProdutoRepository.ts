import { Produto } from "@/entities/Produto";
import { IProdutoRepository } from "@/interfaces";

import { PrismaClient } from "@prisma/client";

class ProdutoRepository implements IProdutoRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async get(categoriaProdutoId: number): Promise<Produto[]> {
        try {
            const getResponse = await this.prismaClient.produto.findMany({
                where: {
                    categoriaProdutoId: categoriaProdutoId,
                },
            });
            return getResponse as Produto[];
        } catch (error) {
            throw error;
        }
    }
    async create(produto: Produto): Promise<Produto> {
        try {
            const creationResponse = await this.prismaClient.produto.create({
                data: {
                    categoriaProdutoId: produto.categoriaProdutoId,
                    descricao: produto.descricao,
                    preco: produto.preco,
                },
            });

            return {
                id: creationResponse.id,
                categoriaProdutoId: creationResponse.categoriaProdutoId,
                descricao: creationResponse.descricao,
                preco: creationResponse.preco,
            } as Produto;
        } catch (error) {
            throw error;
        }
    }

    async update(produto: Produto): Promise<Produto> {
        try {
            const putResponse = await this.prismaClient.produto.update({
                where: { id: produto.id },
                data: {
                    categoriaProdutoId: produto.categoriaProdutoId,
                    descricao: produto.descricao,
                    preco: produto.preco,
                },
            });

            return {
                id: putResponse.id,
                categoriaProdutoId: produto.categoriaProdutoId,
                descricao: produto.descricao,
                preco: produto.preco,
            } as Produto;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<Produto> {
        try {
            await this.prismaClient.produtosDoCardapio.deleteMany({
                where: {
                    produtoId: id,
                },
            });
            await this.prismaClient.produtosDoPedido.deleteMany({
                where: {
                    produtoId: id,
                },
            });
            const deleteResponse = await this.prismaClient.produto.delete({
                where: {
                    id: id,
                },
            });

            return deleteResponse as Produto;
        } catch (error) {
            throw error;
        }
    }
}

export default ProdutoRepository;
