import { IListaProdutosDoPedido } from "../entities/IListaProdutosDoPedido";

export interface IProdutosDoPedidoRepository {
  create(idPedido: number, produtos: IListaProdutosDoPedido[]): Promise<any>;
  delete(idPedido: number, produtos: IListaProdutosDoPedido[]): Promise<any>;
}