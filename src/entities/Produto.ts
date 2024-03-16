import CategoriaProduto from "./CategoriaProduto";
import ProdutosDoCardapio from "./ProdutosDoCardapio";
import { ProdutosDoPedido } from "./ProdutosDoPedido";

interface Produto {
    id: number;
    produtosDoCardapio: ProdutosDoCardapio[];
    produtosDoPedido: ProdutosDoPedido[];
    categoriaProdutoId: number;
    categoriaProduto: CategoriaProduto;
    descricao: string;
    preco: number;
    createdAt: Date;
    updatedAt: Date;
}

class ProdutoImpl implements Produto {
    constructor(
        public id: number,
        public descricao: string,
        public preco: number,
        public categoriaProdutoId: number,
        public produtosDoCardapio: ProdutosDoCardapio[],
        public produtosDoPedido: ProdutosDoPedido[],
        public categoriaProduto: CategoriaProduto,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}

export { Produto, ProdutoImpl };
