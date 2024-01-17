
import { IPedidoGateway, IPedidoRepository } from "@/interfaces";
import { Pedido } from "@prisma/client";


export class PedidoGateway implements IPedidoGateway {
    private pedidoRepository: IPedidoRepository;

    constructor(pedidoRepository: IPedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    async createPedidoGateway(pedido: Pedido): Promise<any>  {
        try {
            const novoPedido = await this.pedidoRepository.create(
                pedido
            );

            return novoPedido;
        } catch (error) {
            throw new Error("Erro ao criar Pedido!");
        }
    }

    async getPedidoByIdGateway(
        idPedido: number
    ): Promise<any> {
        try {
            const getPedido = await this.pedidoRepository.getPedidoById(
                idPedido
            );
            return getPedido;
        } catch (error) {
            throw new Error(
                `Erro ao obter Pedido de Id ${idPedido}`
            );
        }
    }

    async getPedidoGateway(): Promise<any[]> {
        try {
            const getPedido = await this.pedidoRepository.getPedidos();
            return getPedido;
        } catch (error) {
            throw new Error(
                `Erro ao obter Pedidos`
            );
        } 
    }

    async updatePedidoGateway(idPedido: number, statusPedido: string): Promise<any> {
        try {
            const atualizaPedido = await this.pedidoRepository.updatePedido(
                idPedido, statusPedido
            );
            return atualizaPedido;
        } catch (error) {
            throw new Error(
                `Erro ao Atualizar Pedido de Id ${idPedido}`
            );
        } 
    }

    async getPedidosByStatusGateway(statusPedido: string): Promise<any> {
        try {
            const pedido = await this.pedidoRepository.getPedidosByStatus(
                statusPedido
            );
            return pedido;
        } catch (error) {
            throw new Error(
                `Erro ao obter Pedidos com Status ${statusPedido}`
            );
        } 
    }

    async getPedidoByStatusFakeCheckoutGateway(statusPedido: string): Promise<any> {
        try {
            const pedido = await this.pedidoRepository.getPedidoByStatusFakeCheckout(
                statusPedido
            );
            return pedido;
        } catch (error) {
            throw new Error(
                `Erro ao fazer checkout de Pedidos para status ${statusPedido}`
            );
        } 
    }
}
