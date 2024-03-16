import { Pedido } from "./Pedido";

class Pagamento {
    constructor(
        public id: number,
        public realizado: boolean,
        public tipo: string,
        public data: Date,
        public valor: number,
        public pedido: Pedido,
        public statusPagamentoId: number,
        public statusPagamento: StatusPagamento,
        public pedidoId: number,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}

export default Pagamento;