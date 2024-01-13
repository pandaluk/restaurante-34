import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";


export interface IProdutosDoPedidoRepository {
  create(idPedido: number, produtos: ProdutosDoPedido[]): Promise<any>;
  delete(idPedido: number, produtos: ProdutosDoPedido[]): Promise<any>;
}