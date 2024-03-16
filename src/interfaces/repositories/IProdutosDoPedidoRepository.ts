import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { IListaProdutosDoPedido } from "../entities/IListaProdutosDoPedido";

export interface IProdutosDoPedidoRepository {
  create(produtosDoPedido: ProdutosDoPedido[]): Promise<any>;

  delete(produtosDoPedido: ProdutosDoPedido[]): Promise<any>;
  get(idPedido: number): Promise<any>;
}