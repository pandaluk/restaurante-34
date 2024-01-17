import { IListaProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { ProdutosDoPedido } from "@prisma/client";


export interface IProdutosDoPedidoRepository {
  create(idPedido: number, produtos: IListaProdutosDoPedido[]): Promise<any>;
  delete(idPedido: number, produtos: ProdutosDoPedido[]): Promise<any>;
}