
import { Produto } from "@/entities/Produto";
import { IProdutoGateway, IProdutoRepository } from "@/interfaces";

export class ProdutoGateway implements IProdutoGateway {
    private produtoRepository: IProdutoRepository;

    constructor(produtoRepository: IProdutoRepository) {
        this.produtoRepository = produtoRepository;
    }

    async createProduto(produtoData: Produto): Promise<Produto> {
        return this.produtoRepository.create(produtoData);
    }

    async updateProduto(produtoData: Produto): Promise<Produto> {
        return this.produtoRepository.update(produtoData);
    }

    async deleteProduto(id: number): Promise<Produto> {
        return this.produtoRepository.delete(id);
    }

    async getProdutosCategoria(categoriaProdutoId: number): Promise<Produto[]> {
        return this.produtoRepository.get(categoriaProdutoId);
    }
}
