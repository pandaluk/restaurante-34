import { ProdutosDoPedido } from "@prisma/client";



export interface IProdutosDoPedidoRepository {
  create(idPedido: number, produtos: ProdutosDoPedido[]): Promise<any>;
  delete(idPedido: number, produtos: ProdutosDoPedido[]): Promise<any>;
}