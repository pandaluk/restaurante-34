import { IListaProdutosDoPedido } from "@/entities/ProdutosDoPedido";

export interface IProdutosDoPedidoRepository {
  create(idPedido: number, produtos: IListaProdutosDoPedido[]): Promise<any>;
  delete(idPedido: number, produtos: IListaProdutosDoPedido[]): Promise<any>;
  get(idPedido: number): Promise<any>;
}