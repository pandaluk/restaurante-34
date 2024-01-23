import Produto from "@/entities/Produto";
import { IProdutoUseCase, IProdutoGateway } from "@/interfaces";

export class ProdutoUseCase implements IProdutoUseCase {
    private produtoGateway: IProdutoGateway;

    constructor(produtoGateway: IProdutoGateway) {
        this.produtoGateway = produtoGateway;
    }

    async executeGetProdutoCategoria(
        categoriaProdutoId: number
    ): Promise<Produto[]> {
        try {
            const getCategoria =
                await this.produtoGateway.getProdutosCategoriaGateway(
                    categoriaProdutoId
                );

            return getCategoria;
        } catch (error) {
            throw error;
        }
    }
    async executeCreation(produtoData: Produto): Promise<Produto> {
        try {

            const novoProduto = new Produto(
                produtoData.id,
                produtoData.descricao,
                produtoData.preco,
                produtoData.categoriaProdutoId,
                produtoData.produtosDoCardapio,
                produtoData.produtosDoPedido,
                produtoData.categoriaProduto,
                produtoData.quantidade,
                produtoData.valor,
                produtoData.createdAt,
                produtoData.updatedAt
            );

            const novoProdutoResponse = await this.produtoGateway.createProdutoGateway(
              novoProduto
            );

            return novoProdutoResponse;
        } catch (error) {
            throw error;
        }
    }
    async executeUpdate(produtoData: Produto): Promise<Produto> {
        try {
          const novoProduto = new Produto(
                produtoData.id,
                produtoData.descricao,
                produtoData.preco,
                produtoData.categoriaProdutoId,
                produtoData.produtosDoCardapio,
                produtoData.produtosDoPedido,
                produtoData.categoriaProduto,
                produtoData.quantidade,
                produtoData.valor,
                produtoData.createdAt,
                produtoData.updatedAt
            );

            const produtoAtualizado = await this.produtoGateway.updateProdutoGateway(
                novoProduto
            );

            return produtoAtualizado;
        } catch (error) {
            throw error;
        }
    }
    async executeDelete(id: number): Promise<Produto> {
        try {
            const produtoDeletado = await this.produtoGateway.deleteProdutoGateway(
                id
            );

            return produtoDeletado;
        } catch (error) {
            throw error;
        }
    }
}
