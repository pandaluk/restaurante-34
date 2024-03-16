import { Pedido } from "@/entities/Pedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";

export interface IPedidoUseCase{
  executeCreation(pedidoData: Pedido): Promise<Pedido>;
  executeGetPedidoById(idPedido: number): Promise<Pedido>;
  executeGetPedidos(): Promise<Pedido[]>;
  executeGetPedidosByStatus(idStatusPedido: number): Promise<Pedido[]>;
  executeGetPedidoFakeCheckout(status: string): Promise<Pedido[]>;
  executeAddProdutosAoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any>;
  
  executeDelete(idPedido: number): any;
  executeRemoveProdutoDoPedido(idPedido: number, idProdutos: number): any;
  executeUpdatePedidoPreparacao(idPedido: number): any;
  executeUpdatePedidoPronto(idPedido: number): any;
  executeUpdatePedidoFinalizado(idPedido: number): any;
  executeGetProdutoDoPedido(idPedido: number): any;
}