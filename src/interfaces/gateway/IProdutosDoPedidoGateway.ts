import { Pedido, Produto } from "@prisma/client";

export interface IProdutoDoPedidoGateway {
    createProdutoDoPedidoGateway(idPedido: number, produto: Produto[]): Promise<Pedido>;
    deleteProdutoDoPedidoGateway(idPedido: number, produto: Produto[]): Promise<Pedido>;
}
