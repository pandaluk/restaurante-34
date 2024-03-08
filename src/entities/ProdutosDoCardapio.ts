import { Produto } from "./Produto";
import Cardapio from "./Cardapio";

interface ProdutosDoCardapio {
    id: number;
    produto: Produto;
    produtoId: number;
    cardapio: Cardapio;
    cardapioId: number;
    createdAt: Date;
    updatedAt: Date;
}

export default ProdutosDoCardapio;