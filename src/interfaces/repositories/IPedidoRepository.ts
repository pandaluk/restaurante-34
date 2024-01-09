import { Pedido } from "@prisma/client";

export interface IPedidoRepository {
    create(pedido: Pedido): Promise<Pedido>;
    getPedidoById(id: number): Promise<Pedido>;
    getPedidos(): Promise<Pedido[]>;
    getPedidosByStatus(status: string): Promise<Pedido[]>;
    getPedidoByStatusFakeCheckout(status: string): Promise<Pedido[]>;
    updatePedido(id: number, status: string): Promise<Pedido>;
}