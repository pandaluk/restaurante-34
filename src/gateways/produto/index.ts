import { Produto } from "@/entities/produto";
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
            throw error;
        }
    }

    async updateProdutoGateway(produtoData: Produto): Promise<Produto> {
        try {
            const novoCliente = await this.produtoRepository.update(
                produtoData
            );

            return novoCliente;
        } catch (error) {
            throw error;
        }
    }

    async deleteProdutoGateway(id: number): Promise<Produto> {
        try {
            const novoCliente = await this.produtoRepository.delete(id);

            return novoCliente;
        } catch (error) {
            throw error;
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
            throw error;
        }
    }
}
