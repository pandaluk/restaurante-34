import { Pedido, ProdutosDoPedido } from "@prisma/client";

export interface IProdutoDoPedidoGateway {
    createProdutoDoPedidoGateway(idPedido: number, produto: ProdutosDoPedido[]): Promise<Pedido>;
    deleteProdutoDoPedidoGateway(idPedido: number, produto: ProdutosDoPedido[]): Promise<Pedido>;
}
