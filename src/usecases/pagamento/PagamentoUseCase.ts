import { IPagamentoGateway } from "@/interfaces/gateway/IPagamentoGateway";
import { IPagamentoUseCase } from "@/interfaces/usecases/IPagamentoUseCase";
import { IPedidoUseCase } from "@/interfaces/usecases/IPedidoUseCase";
import PedidoUseCase from "../pedido/PedidoUseCase";
import { IPedidoGateway, IProdutoDoPedidoGateway } from "@/interfaces";
import Pagamento from "@/entities/Pagamento";

export class PagamentoUseCase implements IPagamentoUseCase {
    private pagamentoGateway: IPagamentoGateway;
    private pedidoUseCase: IPedidoUseCase;

    constructor(
        pagamentoGateway: IPagamentoGateway,
        pedidoGateway: IPedidoGateway,
        produtosDoPedidoGateway: IProdutoDoPedidoGateway
    ) {
        this.pagamentoGateway = pagamentoGateway;
        this.pedidoUseCase = new PedidoUseCase(produtosDoPedidoGateway, pedidoGateway);
    }

    async executeCreation(idPedido: number): Promise<Pagamento> {
        try {
            const produtosDoPedido = await this.pedidoUseCase.executeGetProdutoDoPedido(idPedido);
            let valorTotalPagamento = 0;

            for (const produto of produtosDoPedido) {
                const valorProduto = produto.quantidade * produto.valor;
                valorTotalPagamento += valorProduto;
            }

            const pagamentoData = {
                statusPagamentoId: 1,
                pedidoId: idPedido,
                tipo: "Pix",
                data: new Date(),
                valor: valorTotalPagamento
            };

            const novoPagamento = await this.pagamentoGateway.createPagamentoGateway(pagamentoData);
            return novoPagamento;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async executeWebhookUpdate(pagamentoId: number, status: number): Promise<Pagamento>{
        try {
            const pagamentoAtualizado = await this.pagamentoGateway.webhookUpdatePagamentoGateway(
                pagamentoId,
                status
            );
            return pagamentoAtualizado;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async executeGetPagamento(pagamentoId: number): Promise<Pagamento> {
        try {
            const pagamento = await this.pagamentoGateway.getPagamentoGateway(pagamentoId);
            return pagamento;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}