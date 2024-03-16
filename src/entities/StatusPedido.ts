import { Pedido } from "./Pedido";

interface StatusPedido {
    id: number;
    pedido: Pedido[];
    enumerador: string;
    createdAt: Date;
    updatedAt: Date;
}

export default StatusPedido;