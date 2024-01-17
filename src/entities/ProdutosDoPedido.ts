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
      if (listaProdutos.length > 1) {
        throw new Error("Lista de produtos vazia");
      }
    }
}
export interface IListaProdutosDoPedido {
  produtoId: number;
  quantidade: number;
  valor: number;
}

export default ProdutosDoPedido;