import PagamentoRepository from "@/external/repositories/PagamentoRepository";
import PedidoRepository from "@/external/repositories/PedidoRepository";
import ProdutosDoPedidoRepository from "@/external/repositories/ProdutosDoPedidoRepository";
import { PagamentoGateway } from "@/gateways/pagamento";
import { PedidoGateway } from "@/gateways/pedido";
import { ProdutoDoPedidoGateway } from "@/gateways/produtosDoPedido";
import { IPedidoGateway, IProdutoDoPedidoGateway } from "@/interfaces";
import { IPagamentoController } from "@/interfaces/controllers/IPagamentoController";
import { IPagamentoGateway } from "@/interfaces/gateway/IPagamentoGateway";
import { IPagamentoUseCase } from "@/interfaces/usecases/IPagamentoUseCase";
import { PagamentoUseCase } from "@/usecases/pagamento/PagamentoUseCase";
import { Response, Request } from "express";

export default class PagamentoController implements IPagamentoController {
    private pagamentoGateway: IPagamentoGateway;
    private pagamentoUseCase: IPagamentoUseCase;
    private pedidoGateway: IPedidoGateway;
    private produtosDoPedidoGateway: IProdutoDoPedidoGateway;

    constructor(
        pagamentoRepository: PagamentoRepository,
        pedidoRepository: PedidoRepository,
        produtosDoPedidoRepository: ProdutosDoPedidoRepository
    ) {
        this.pedidoGateway = new PedidoGateway(pedidoRepository);
        this.produtosDoPedidoGateway = new ProdutoDoPedidoGateway(produtosDoPedidoRepository);
        
        this.pagamentoGateway = new PagamentoGateway(pagamentoRepository);
        this.pagamentoUseCase = new PagamentoUseCase(
            this.pagamentoGateway, 
            this.pedidoGateway,
            this.produtosDoPedidoGateway
        );
    }

    async createPagamento(req: Request, res: Response) {
        const { idPedido } = req.body;

        if (!idPedido) {
            return res.status(400).json({ message: "Erro ao criar pagamento, campo 'idPedido' está vazio"});
        }

        try {
            const response = await this.pagamentoUseCase.executeCreation(idPedido);
            return res.status(200).json({
                message: "Pagamento criado", response
            });
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }

    async webhookUpdatePagamento(req: Request, res: Response) {
        const { token, pagamentoId, status } = req.body;

        if(!token) {
            return res.status(400).json({ message: "Token de acesso inválido"});
        }

        if (!pagamentoId || !status) {
            return res.status(400).json({ message: "Erro ao atualizar pagamento, campo 'pagamentoId' e/ou 'status' está(ão) vazio(s)"});
        }

        try {
            const response = await this.pagamentoUseCase.executeWebhookUpdate(pagamentoId, status);
            return res.status(200).json({
                message: "Status do pagamento atualizado", response
            });
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }
    async getPagamento(req: Request, res: Response) {
        const { pagamentoId } = req.params;

        if(!pagamentoId) {
            return res.status(400).json({ message: "Erro, o campo 'pagamentoId' está vazio'"});
        }

        try {
            const pagamento = await this.pagamentoUseCase.executeGetPagamento(parseInt(pagamentoId));
            return res.status(200).json({ pagamento });
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }
}