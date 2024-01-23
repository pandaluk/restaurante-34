import ProdutosDoPedido from "@/entities/ProdutosDoPedido";
export interface IProdutoDoPedidoGateway {
    createProdutoDoPedidoGateway(produtosDoPedido: ProdutosDoPedido): Promise<any>;
    deleteProdutoDoPedidoGateway(produtosDoPedido: ProdutosDoPedido): Promise<any>;
}
