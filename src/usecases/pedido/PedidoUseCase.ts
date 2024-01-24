import { IPedidoGateway, IPedidoUseCase, IProdutoDoPedidoGateway } from "@/interfaces";

import ProdutosDoPedido from "@/entities/ProdutosDoPedido";
import { IListaProdutosDoPedido } from "@/interfaces/entities/IListaProdutosDoPedido";
import Pedido from "@/entities/Pedido";

class PedidoUseCase implements IPedidoUseCase {
    private produtosDoPedidoGateway: IProdutoDoPedidoGateway;
    private pedidoGateway: IPedidoGateway;

    constructor(
        produtosDoPedidoGateway: IProdutoDoPedidoGateway,
        pedidoGateway: IPedidoGateway
    ) {
        this.produtosDoPedidoGateway = produtosDoPedidoGateway;
        this.pedidoGateway= pedidoGateway;
    }

    async executeCreation(clienteData: Pedido) {
        clienteData.statusPedidoId = 1;
        try {
          const newPedido = new Pedido(
                clienteData.id,
                clienteData.statusPedidoId,
                clienteData.clienteId,
                clienteData.cliente,
                clienteData.pagamento,
                clienteData.statusPedido,
                clienteData.produtosDoPedido
          );
            const response = await this.pedidoGateway.createPedidoGateway(newPedido);

            return response;
        } catch (error) {
            throw error;
        }
    }

    executeDelete(id: number) {
        throw new Error("Method executeDelete not implemented.");
    }

    async executeUpdatePedidoFinalizado(idPedido: number) {
        try {
            const response = await this.pedidoGateway.updatePedidoGateway(
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
            const response = await this.pedidoGateway.updatePedidoGateway(
                idPedido,
                "Em preparação"
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    async executeGetPedidoById(idPedido: number) {
        try {
            const response = await this.pedidoGateway.getPedidoByIdGateway(
                idPedido
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    async executeGetPedidos() {
        try {
            const response = await this.pedidoGateway.getPedidoGateway();
            const formatResponse = this.orderPedidos(response)
            return formatResponse;
        } catch (error) {
            throw error;
        }
    }
    
    orderPedidos(pedidos: any[]): any[]{
        const pedidosEmPreparacao = pedidos.filter((pedido) => pedido.statusPedido.enumerador == 'Em preparação');
        const pedidosPronto = pedidos.filter((pedido) => pedido.statusPedido.enumerador == 'Pronto');
        const pedidosRecebido = pedidos.filter((pedido) => pedido.statusPedido.enumerador == 'Recebido');
    
        return [...pedidosPronto, ...pedidosEmPreparacao, ...pedidosRecebido];
    }


    async executeGetPedidoByStatus(status: string) {
        try {
            const response = await this.pedidoGateway.getPedidosByStatusGateway(
                status
            );

            return response;
        } catch (error) {
            throw error;
        }
    }
    async executeGetPedidoFakeCheckout(status: string) {
        try {
            const response =
                await this.pedidoGateway.getPedidoByStatusFakeCheckoutGateway(
                    status
                );

            return response;
        } catch (error) {
            throw error;
        }
    }

    async executeUpdatePedidoPronto(idPedido: number) {
        try {
            const response = await this.pedidoGateway.updatePedidoGateway(
                idPedido,
                "Pronto"
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    executeAddProdutoAoPedido(idPedido: number, produtos: IListaProdutosDoPedido[]) {
        try {
          const produtosDoPedido = new ProdutosDoPedido(idPedido, produtos);

          const response = this.produtosDoPedidoGateway.createProdutoDoPedidoGateway(produtosDoPedido);

            return response;
        } catch (error) {
            throw error;
        }
    }

    executeRemoveProdutoDoPedido(idPedido: number, idProdutos: number) {
        throw new Error("Method executeRemoveProdutoAoPedido not implemented.");
    }
    
    async executeGetProdutoDoPedido(idPedido: number) {
        try {
            const produtosDoPedido = await this.produtosDoPedidoGateway.getProdutoDoPedidoGateway(idPedido);
            return produtosDoPedido;
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao buscar Produtos do Pedido ${idPedido}`);            
        }
    }
}

export default PedidoUseCase;
