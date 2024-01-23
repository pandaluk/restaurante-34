import Produto from "@/entities/produto";

export interface IProdutoRepository {
    create(produto: Produto): Promise<Produto>;
    update(produto: Produto): Promise<Produto>;
    delete(id: number): Promise<Produto>;
    get(categoriaProdutoId: number): Promise<Produto[]>;
}
