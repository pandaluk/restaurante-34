import { Produto } from "@/entities/Produto";
import { IProdutoGateway, IProdutoRepository } from "@/interfaces";

export class ProdutoGateway implements IProdutoGateway {
    private produtoRepository: IProdutoRepository;

    constructor(produtoRepository: IProdutoRepository) {
        this.produtoRepository = produtoRepository;
    }

    async createProdutoGateway(produtoData: Produto): Promise<Produto> {
        try {
            const novoCliente = await this.produtoRepository.create(
                produtoData
            );

            return novoCliente;
        } catch (error) {
            throw new Error("Erro ao criar produto!");
        }
    }

    async updateProdutoGateway(produtoData: Produto): Promise<Produto> {
        try {
            const novoCliente = await this.produtoRepository.update(
                produtoData
            );

            return novoCliente;
        } catch (error) {
            throw new Error("Erro ao atualizar o produto!");
        }
    }

    async deleteProdutoGateway(id: number): Promise<Produto> {
        try {
            const novoCliente = await this.produtoRepository.delete(id);
            return novoCliente;
        } catch (error) {
            console.log("error", error);
            throw new Error("Erro ao excluir o produto!");
        }
    }

    async getProdutosCategoriaGateway(
        categoriaProdutoId: number
    ): Promise<Produto[]> {
        try {
            const getCategoria = await this.produtoRepository.get(
                categoriaProdutoId
            );
            return getCategoria;
        } catch (error) {
            throw new Error(
                `Erro ao obter produtos da categoria ${categoriaProdutoId}`
            );
        }
    }
}
