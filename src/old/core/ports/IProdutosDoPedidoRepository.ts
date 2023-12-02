import { Produto, ProdutosDoPedido } from "@prisma/client";

export interface IProdutosDoPedidoRepository {
  create(idPedido: number, produtos: Produto[]): Promise<any>;
  delete(idPedido: number, produtos: Produto[]): Promise<any>;
}