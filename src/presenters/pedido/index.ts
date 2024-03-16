import { IPedidoPresenter } from "@/interfaces/presenters/IPedidoPresenter";
import { BasePresenter } from "../BasePresenter";
import { Pedido } from "@/entities/Pedido";

export class PedidoPresenter extends BasePresenter implements IPedidoPresenter {
    presenterPedidosParaRespostaHttp(message: string, success: boolean, pedidos: Pedido[]) {
        throw new Error("Method not implemented.");
    }
    presenterPedidoParaRespostaHttp(message: string, success: boolean, pedido: Pedido) {
        throw new Error("Method not implemented.");
    }

}