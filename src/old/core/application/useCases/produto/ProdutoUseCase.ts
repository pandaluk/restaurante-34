import { Produto } from "../../../domain/Entities/Produto";
import { IProdutoRepository } from "@/core/ports/IProdutoRepository";
import { IProdutoUseCase } from "./IProdutoUseCase";

export class CreateProdutoUseCase implements IProdutoUseCase {
    private produtoRepository: IProdutoRepository;

    constructor(produtoRepository: IProdutoRepository) {
        this.produtoRepository = produtoRepository;
    }

    async executeGetProdutoCategoria(
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
    async executeCreation(produtoData: Produto): Promise<Produto> {
        try {
            const novoCliente = await this.produtoRepository.create(
                produtoData
            );

            return novoCliente;
        } catch (error) {
            throw error;
        }
    }
    async executeUpdate(produtoData: Produto): Promise<Produto> {
        try {
            const novoCliente = await this.produtoRepository.update(
                produtoData
            );

            return novoCliente;
        } catch (error) {
            throw error;
        }
    }
    async executeDelete(id: number): Promise<Produto> {
        try {
            const novoCliente = await this.produtoRepository.delete(id);

            return novoCliente;
        } catch (error) {
            throw error;
        }
    }
}
