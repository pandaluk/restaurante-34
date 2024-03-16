import { Produto } from "@/entities/Produto";
export interface IProdutoGateway {
    createProduto(produtoData: Produto): Promise<Produto>;
    updateProduto(produtoData: Produto): Promise<Produto>;
    deleteProduto(id: number): Promise<Produto>;
    getProdutosCategoria(categoriaProdutoId: number): Promise<Produto[]>;
}
