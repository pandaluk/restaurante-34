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
            const novoCliente = await this.produtoGateway.createProdutoGateway(
                produtoData
            );

            return novoCliente;
        } catch (error) {
            throw error;
        }
    }
    async executeUpdate(produtoData: Produto): Promise<Produto> {
        try {
            const novoCliente = await this.produtoGateway.updateProdutoGateway(
                produtoData
            );

            return novoCliente;
        } catch (error) {
            throw error;
        }
    }
    async executeDelete(id: number): Promise<Produto> {
        try {
            const novoCliente = await this.produtoGateway.deleteProdutoGateway(
                id
            );

            return novoCliente;
        } catch (error) {
            throw error;
        }
    }
}
