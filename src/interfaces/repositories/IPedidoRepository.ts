import { Pedido } from "@prisma/client";
import * as pedidoEntity from "@/entities/Pedido";

export interface IPedidoRepository {
    create(pedido: pedidoEntity.default): Promise<Pedido>;
    getPedidoById(id: number): Promise<Pedido>;
    getPedidos(): Promise<Pedido[]>;
    getPedidosByStatus(status: string): Promise<Pedido[]>;
    getPedidoByStatusFakeCheckout(status: string): Promise<Pedido[]>;
    updatePedido(id: number, status: string): Promise<Pedido>;
}