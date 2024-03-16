import { Produto } from "@/entities/Produto";

export interface IProdutoRepository {
    create(produto: Produto): Promise<Produto>;
    update(produto: Produto): Promise<Produto>;
    delete(id: number): Promise<Produto>;
    get(categoriaProdutoId: number): Promise<Produto[]>;
}
