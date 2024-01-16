import { Pedido, Produto } from "@prisma/client";

export interface IPedidoUseCase{
  executeCreation(pedidoData: Pedido): any;
  executeDelete(idPedido: number): any;
  executeGetPedidoById(idPedido: number): any;
  executeGetPedidos(): any;
  executeAddProdutoAoPedido(idPedido: number, produtos: Produto[]): any;
  executeRemoveProdutoDoPedido(idPedido: number, idProdutos: number): any;
  executeUpdatePedidoPreparacao(idPedido: number): any;
  executeUpdatePedidoPronto(idPedido: number): any;
  executeUpdatePedidoFinalizado(idPedido: number): any;
  executeGetPedidoByStatus(status: string): any;
  executeGetPedidoFakeCheckout(status: string): any;
}