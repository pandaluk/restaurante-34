import { Produto, ProdutoImpl } from "@/entities/Produto";
import { IProdutoUseCase, IProdutoGateway } from "@/interfaces";

export class ProdutoUseCase implements IProdutoUseCase {
    private produtoGateway: IProdutoGateway;

    constructor(produtoGateway: IProdutoGateway) {
        this.produtoGateway = produtoGateway;
    }

    async executeGetProdutoCategoria(categoriaProdutoId: number): Promise<Produto[]> {
        return this.produtoGateway.getProdutosCategoria(categoriaProdutoId);
    }

    async executeCreation(produtoData: Produto): Promise<Produto> {
        const {
            id,
            descricao,
            preco,
            categoriaProdutoId,
            produtosDoCardapio,
            produtosDoPedido,
            categoriaProduto,
            createdAt,
            updatedAt
        } = produtoData;

        const novoProduto = new ProdutoImpl(
            id,
            descricao,
            preco,
            categoriaProdutoId,
            produtosDoCardapio,
            produtosDoPedido,
            categoriaProduto,
            createdAt,
            updatedAt
        );

        return this.produtoGateway.createProduto(novoProduto);
    }

    async executeUpdate(produtoData: Produto): Promise<Produto> {
        const novoProduto = new ProdutoImpl(
            produtoData.id,
            produtoData.descricao,
            produtoData.preco,
            produtoData.categoriaProdutoId,
            produtoData.produtosDoCardapio,
            produtoData.produtosDoPedido,
            produtoData.categoriaProduto,
            produtoData.createdAt,
            produtoData.updatedAt
        );

        return this.produtoGateway.updateProduto(novoProduto);
    }

    async executeDelete(id: number): Promise<Produto> {
        return this.produtoGateway.deleteProduto(id);
    }
}
