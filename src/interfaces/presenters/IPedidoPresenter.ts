import { Pedido } from "@/entities/Pedido";

export interface IPedidoPresenter {
    presenterPedidosParaRespostaHttp(message: string, success: boolean, pedidos: Pedido[]): any;
    presenterPedidoParaRespostaHttp(message: string, success: boolean, pedido: Pedido): any;
}