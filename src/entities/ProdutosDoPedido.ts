import { IListaProdutosDoPedido } from "@/interfaces/entities/IListaProdutosDoPedido";

class ProdutosDoPedido {
    idPedido: number;
    listaProdutos: IListaProdutosDoPedido[];

    constructor(
        pedidoId: number,
        listaProdutos: IListaProdutosDoPedido[],
    ) {
        this.idPedido = pedidoId;
        this.listaProdutos = listaProdutos;

        this.validateProductsQuantity(listaProdutos);
    }

    validateProductsQuantity(listaProdutos: IListaProdutosDoPedido[]) {
      if (listaProdutos.length <= 0) {
        throw new Error("Lista de produtos vazia");
      }
    }
}

export default ProdutosDoPedido;