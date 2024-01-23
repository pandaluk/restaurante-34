import { Pedido } from "@prisma/client";
import * as pedidoEntity from "@/entities/Pedido";

export interface IPedidoGateway {
    createPedidoGateway(pedido: pedidoEntity.default): Promise<Pedido>;
    getPedidoByIdGateway(id: number): Promise<Pedido>;
    getPedidoGateway(): Promise<Pedido[]>;
    updatePedidoGateway(idPedido: number, statusPedido: string): Promise<Pedido>;
    getPedidosByStatusGateway(statusPedido: string): Promise<Pedido[]>;
    getPedidoByStatusFakeCheckoutGateway(statusPedido: string): Promise<Pedido>;
}
