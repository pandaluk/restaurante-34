import { IPedidoGateway, IPedidoUseCase, IProdutoDoPedidoGateway } from "@/interfaces";

import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { Pedido } from "@/entities/Pedido";
import { EnumStatusPedido } from "@/enums/EnumStatusPedido";

class PedidoUseCase implements IPedidoUseCase {
    private produtosDoPedidoGateway: IProdutoDoPedidoGateway;
    private pedidoGateway: IPedidoGateway;

    constructor(
        produtosDoPedidoGateway: IProdutoDoPedidoGateway,
        pedidoGateway: IPedidoGateway
    ) {
        this.produtosDoPedidoGateway = produtosDoPedidoGateway;
        this.pedidoGateway = pedidoGateway;
    }

    async executeCreation(pedidoData: Pedido): Promise<Pedido> {
        pedidoData.statusPedidoId = EnumStatusPedido.RECEBIDO.id;
        const pedidoCriado: Pedido = await this.pedidoGateway.createPedido(pedidoData);
        return pedidoCriado;
    }

    async executeGetPedidoById(idPedido: number): Promise<Pedido> {
        return this.pedidoGateway.getPedidoById(idPedido);        
    }

    async executeGetPedidos(): Promise<Pedido[]> {
        const pedidos = await this.pedidoGateway.getPedidos();
        const pedidosOrdenados: Pedido[] = this.orderPedidos(pedidos);
        return pedidosOrdenados;
    }

    async executeGetPedidosByStatus(idStatusPedido: number): Promise<Pedido[]> {
        return this.pedidoGateway.getPedidosByStatus(idStatusPedido);            
    }

    async executeGetPedidoFakeCheckout(status: string): Promise<Pedido[]> {
        return this.pedidoGateway.getPedidoByStatusFakeCheckout(status);
    }

    async executeAddProdutosAoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any> {
        return this.produtosDoPedidoGateway.createProdutosDoPedido(produtosDoPedido);        
    }

    executeRemoveProdutoDoPedido(idPedido: number, idProdutos: number) {
        throw new Error("Method executeRemoveProdutoAoPedido not implemented.");
    }

    executeDelete(id: number) {
        throw new Error("Method executeDelete not implemented.");
    }

    async executeUpdatePedidoFinalizado(idPedido: number) {
        try {
            const response = await this.pedidoGateway.updatePedido(
                idPedido,
                "Finalizado"
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    async executeUpdatePedidoPreparacao(idPedido: number) {
        try {
            const response = await this.pedidoGateway.updatePedido(
                idPedido,
                "Em preparação"
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    
    

    async executeUpdatePedidoPronto(idPedido: number) {
        try {
            const response = await this.pedidoGateway.updatePedido(
                idPedido,
                "Pronto"
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    

    

    async executeGetProdutoDoPedido(idPedido: number) {
        try {
            const produtosDoPedido = await this.produtosDoPedidoGateway.getProdutosDoPedido(idPedido);
            return produtosDoPedido;
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao buscar Produtos do Pedido ${idPedido}`);
        }
    }

    private orderPedidos(pedidos: Pedido[]): Pedido[] {
        const pedidosEmPreparacao = pedidos.filter((pedido) => pedido.statusPedido.id == EnumStatusPedido.EM_PREPARACAO.id);
        const pedidosPronto = pedidos.filter((pedido) => pedido.statusPedido.id == EnumStatusPedido.PRONTO.id);
        const pedidosRecebido = pedidos.filter((pedido) => pedido.statusPedido.id == EnumStatusPedido.RECEBIDO.id);

        return [...pedidosPronto, ...pedidosEmPreparacao, ...pedidosRecebido];
    }
}

export default PedidoUseCase;
