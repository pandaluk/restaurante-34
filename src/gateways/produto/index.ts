
import { Produto } from "@/entities/Produto";
import { IProdutoGateway, IProdutoRepository } from "@/interfaces";

export class ProdutoGateway implements IProdutoGateway {
    private produtoRepository: IProdutoRepository;

    constructor(produtoRepository: IProdutoRepository) {
        this.produtoRepository = produtoRepository;
    }

    async createProdutoGateway(produtoData: Produto): Promise<Produto> {
        return this.produtoRepository.create(produtoData);
    }

    async updateProdutoGateway(produtoData: Produto): Promise<Produto> {
        return this.produtoRepository.update(produtoData);
    }

    async deleteProdutoGateway(id: number): Promise<Produto> {
        return this.produtoRepository.delete(id);
    }

    async getProdutosCategoriaGateway(categoriaProdutoId: number): Promise<Produto[]> {
        return this.produtoRepository.get(categoriaProdutoId);
    }
}
