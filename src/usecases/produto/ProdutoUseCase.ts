import { Produto } from "@/entities/produto";
import { IProdutoUseCase, IProdutoGateway } from "@/interfaces";

export class ProdutoUseCase implements IProdutoUseCase {
    private produtoGateway: IProdutoGateway;

    constructor(produtoGateway: IProdutoGateway) {
        this.produtoGateway = produtoGateway;
    }
    // chama gateway e o gateway chama o repositories
    async executeGetProdutoCategoria(categoriaProdutoId: number) {
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
    async executeCreation(produtoData: Produto) {
        try {
            const novoCliente = await this.produtoGateway.createProdutoGateway(
                produtoData
            );

            return novoCliente;
        } catch (error) {
            throw error;
        }
    }
    async executeUpdate(produtoData: Produto) {
        try {
            const novoCliente = await this.produtoGateway.updateProdutoGateway(
                produtoData
            );

            return novoCliente;
        } catch (error) {
            throw error;
        }
    }
    async executeDelete(id: number) {
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
