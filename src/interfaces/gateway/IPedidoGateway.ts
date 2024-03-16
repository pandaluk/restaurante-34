import { Pedido } from "@/entities/Pedido";

export interface IPedidoGateway {
    createPedido(pedido: Pedido): Promise<Pedido>;
    getPedidoById(id: number): Promise<Pedido>;
    getPedidos(): Promise<Pedido[]>;
    getPedidosByStatus(idStatusPedido: number): Promise<Pedido[]>;
    getPedidoByStatusFakeCheckout(statusPedido: string): Promise<Pedido[]>;
    
    updatePedido(idPedido: number, statusPedido: string): Promise<Pedido>;
}