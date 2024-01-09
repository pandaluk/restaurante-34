import { Pedido } from "@prisma/client";

export interface IPedidoGateway {
    createPedidoGateway(pedido: Pedido): Promise<Pedido>;
    getPedidoByIdGateway(id: number): Promise<Pedido>;
    getPedidoGateway(): Promise<Pedido[]>;
    updatePedidoGateway(idPedido: number, statusPedido: string): Promise<Pedido>;
    getPedidosByStatusGateway(statusPedido: string): Promise<Pedido[]>;
    getPedidoByStatusFakeCheckoutGateway(statusPedido: string): Promise<Pedido>;
}
