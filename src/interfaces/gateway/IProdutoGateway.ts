import { Produto } from "@/entities/Produto";
export interface IProdutoGateway {
    createProdutoGateway(produtoData: Produto): Promise<Produto>;
    updateProdutoGateway(produtoData: Produto): Promise<Produto>;
    deleteProdutoGateway(id: number): Promise<Produto>;
    getProdutosCategoriaGateway(categoriaProdutoId: number): Promise<Produto[]>;
}
