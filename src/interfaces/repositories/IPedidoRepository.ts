
import { Pedido } from "@/entities/Pedido";

export interface IPedidoRepository {
    create(pedido: Pedido): Promise<Pedido>;
    getPedidoById(id: number): Promise<Pedido>;
    getPedidos(): Promise<Pedido[]>;
    getPedidosByStatus(idStatusPedido: number): Promise<Pedido[]>;

    getPedidoByStatusFakeCheckout(status: string): Promise<Pedido[]>;
    updatePedido(id: number, status: string): Promise<Pedido>;
}