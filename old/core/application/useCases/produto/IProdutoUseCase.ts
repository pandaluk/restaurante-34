import { Produto } from "@prisma/client";


export interface IProdutoUseCase {
    executeCreation(produtoData: Produto): Promise<Produto>;
    executeDelete(id: number): Promise<Produto>;
    executeUpdate(produtoData: Produto): Promise<Produto>;
    executeGetProdutoCategoria(categoriaProdutoId: number): Promise<Produto[]>;
}
