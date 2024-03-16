import Cliente from "./Cliente";
import Pagamento from "./Pagamento";
import StatusPedido from "./StatusPedido";
import { ProdutosDoPedido } from "./ProdutosDoPedido";
import { BaseEntity } from "./BaseEntity";

interface Pedido extends BaseEntity {
  id: number;
  clienteId: number;
  cliente: Cliente;
  pagamento: Pagamento[];
  statusPedidoId: number;
  statusPedido: StatusPedido;
  ProdutosDoPedido: ProdutosDoPedido[];
}

export { Pedido };