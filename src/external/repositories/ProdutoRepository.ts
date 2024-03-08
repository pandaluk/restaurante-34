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

            const produtoUnknown: unknown = getResponse;
            const produtosConvertidos = produtoUnknown as Produto[];

            return produtosConvertidos;
        } catch (error) {
            console.error("Erro localizar produtos por categoria:", error);
            throw new Error("Erro localizar produtos por categoria.");
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

            const produtoUnknown: unknown = creationResponse;
            const produtoConvertido = produtoUnknown as Produto;

            return produtoConvertido;
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            throw new Error("Erro ao criar produto.");
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

            const produtoUnknown: unknown = putResponse;
            const produtoAtualizado = produtoUnknown as Produto;

            return produtoAtualizado;
        } catch (error) {
            console.error("Erro ao atualizar produto: ", error);
            throw new Error("Erro ao atualizar produto.");
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

            const produtoUnknown: unknown = deleteResponse;
            const produtoAtualizado = produtoUnknown as Produto;

            return produtoAtualizado;
        } catch (error) {
            console.error("Erro ao excluir produto: ", error);
            throw new Error("Erro ao excluir produto.");
        }
    }
}

export default ProdutoRepository;
