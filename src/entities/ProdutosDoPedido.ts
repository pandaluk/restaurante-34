import {Produto} from "./Produto";
import {Pedido} from "./Pedido";
import { BaseEntity } from "./BaseEntity";

interface ProdutosDoPedido extends BaseEntity{
    id: number;
    produtoId: number;
    produto: Produto;
    pedidoId: number;
    pedido: Pedido;
    quantidade: number;
    valor: number;
}

const validateProdutosDoPedido = (produtosDoPedido: ProdutosDoPedido): boolean => {
    if (produtosDoPedido.quantidade <= 0) {
        throw new Error("A quantidade deve ser maior que zero.");
    }
    if (produtosDoPedido.valor <= 0) {
        throw new Error("O valor deve ser maior que zero.");
    }
    return true;
};

export { ProdutosDoPedido, validateProdutosDoPedido };