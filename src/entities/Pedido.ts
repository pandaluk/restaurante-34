import { Cliente } from "./Cliente";
import ProdutosDoPedido from "@/old/adapters/Driver/ProdutosDoPedido";
import { Pagamento } from "@prisma/client";

class Pedido {
    constructor(
        public id: number,
        public statusPedidoId: number,
        public clienteId: number,
        public createdAt: Date,
        public updateAt: Date,
        public cliente: Cliente,
        public pagamento: Pagamento[],
        public statusPedido: StatusPedido,
        public produtosDoPedido: ProdutosDoPedido[]
    ) {}
}

export default Pedido;
