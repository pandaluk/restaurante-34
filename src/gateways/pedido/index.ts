
import { Pedido } from "@/entities/Pedido";
import { IPedidoGateway, IPedidoRepository } from "@/interfaces";

export class PedidoGateway implements IPedidoGateway {
    private pedidoRepository: IPedidoRepository;

    constructor(pedidoRepository: IPedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    async createPedido(pedido: Pedido): Promise<Pedido> {
        return this.pedidoRepository.create(pedido);
    }

    async getPedidoById(idPedido: number): Promise<Pedido> {
        return this.pedidoRepository.getPedidoById(idPedido);
    }

    async getPedidos(): Promise<Pedido[]> {
        return this.pedidoRepository.getPedidos();
    }

    async getPedidosByStatus(idStatusPedido: number): Promise<Pedido[]> {
        return this.pedidoRepository.getPedidosByStatus(idStatusPedido);        
    }

    async getPedidoByStatusFakeCheckout(statusPedido: string): Promise<Pedido[]> {
        return this.pedidoRepository.getPedidoByStatusFakeCheckout(statusPedido);
    }

    async updatePedido(idPedido: number, statusPedido: string): Promise<any> {
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

    

    
}
