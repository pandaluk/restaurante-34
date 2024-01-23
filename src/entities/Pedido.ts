import { Pagamento, ProdutosDoPedido } from "@prisma/client";
import Cliente from "./Cliente";
import { StatusPedido } from "./StatusPedido";

class Pedido {

    id: number;
    statusPedidoId: number;
    clienteId: number;
    cliente: Cliente;
    pagamento: Pagamento[];
    statusPedido: StatusPedido;
    produtosDoPedido: ProdutosDoPedido[];

    constructor(
        id: number,
        statusPedidoId: number,
        clienteId: number,
        cliente: Cliente,
        pagamento: Pagamento[],
        statusPedido: StatusPedido,
        produtosDoPedido: ProdutosDoPedido[]
    ) {
        this.id = id,
        this.statusPedidoId= statusPedidoId,
        this.clienteId= clienteId,
        this.cliente= cliente,
        this.pagamento= pagamento,
        this.statusPedido= statusPedido,
        this.produtosDoPedido= produtosDoPedido
    }
}

export default Pedido;
