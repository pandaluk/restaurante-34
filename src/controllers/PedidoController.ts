import {
    IPedidoController,
    IPedidoUseCase,
    IPedidoGateway,
    IProdutoDoPedidoGateway,
} from "@/interfaces";
import PedidoRepository from "@/external/repositories/PedidoRepository";
import { Request, Response } from "express";
import { PedidoGateway } from "@/gateways/pedido";
import PedidoUseCase from "@/usecases/pedido/PedidoUseCase";
import { ProdutoDoPedidoGateway } from "@/gateways/produtosDoPedido";
import ProdutosDoPedidoRepository from "@/external/repositories/ProdutosDoPedidoRepository";
import { Pedido } from "@/entities/Pedido";
import { BasePresenter } from "@/presenters/BasePresenter";
import { EnumStatusPedido, getDescricaoStatusPedido } from "@/enums/EnumStatusPedido";
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";

class PedidoController implements IPedidoController {
    private pedidoUseCase: IPedidoUseCase;
    private pedidoGateway: IPedidoGateway;
    private produtosDoPedidoGateway: IProdutoDoPedidoGateway;
    private basePresenter = new BasePresenter();

    constructor(
        pedidoRepository: PedidoRepository,
        produtosDoPedidoRepository: ProdutosDoPedidoRepository
    ) {
        this.pedidoGateway = new PedidoGateway(pedidoRepository);
        this.produtosDoPedidoGateway = new ProdutoDoPedidoGateway(produtosDoPedidoRepository);
        this.pedidoUseCase = new PedidoUseCase(this.produtosDoPedidoGateway, this.pedidoGateway);
    }

    async createPedido(req: Request, res: Response) {
        const pedidoData = req.body;
        try {
            if (!pedidoData?.clienteId) {
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                    "Erro ao criar pedido: campos obrigatórios ausentes",
                    false
                );
                return res.status(400).json(response);
            }

            const pedido: Pedido = await this.pedidoUseCase.executeCreation(pedidoData);

            const response = BasePresenter.presenterEntityParaRespostaHttp(
                "Pedido criado com sucesso",
                true,
                pedido
            );

            return res.status(201).json({ message: "Pedido criado com sucesso", response });
        } catch (error: any) {
            const errorMessage = error?.message || "Erro interno ao criar o pedido";
            const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
        }
    }

    async getPedidoById(req: Request, res: Response) {        
        const { idPedido } = req.params;
        try {

            if (!idPedido) {
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                    "Erro ao buscar pedido: campo 'idPedido' é obrigatório",
                    false
                );
                return res.status(400).json(response);
            }

            const pedido: Pedido = await this.pedidoUseCase.executeGetPedidoById(parseInt(idPedido));
            const response = BasePresenter.presenterEntityParaRespostaHttp(
                `Pedido id ${pedido.id}`,
                true,
                pedido
            );

            return res.status(200).json({ response });
        } catch (error: any) {
            const errorMessage = error?.message || "Erro interno ao buscar o pedido";
            const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
        }
    }

    async getPedidos(req: Request, res: Response) {
        try {
            const pedidos = await this.pedidoUseCase.executeGetPedidos();

            const response = BasePresenter.presenterEntitysParaRespostaHttp(
                "Pedidos ordenados pelo status(Pronto > Em Preparação > Recebido) e pela data. Não mostra os finalizados",
                true,
                pedidos
            );

            return res.status(200).json({ response });
        } catch (error: any) {
            const errorMessage = error?.message || "Erro interno ao buscar os pedidos";
            const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
        }
    }

    async getPedidosByStatus(req: Request, res: Response) {
        const { idStatusPedido } = req.params;
        try {
            if (!idStatusPedido) {
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                    "Erro ao buscar pedidos: campo 'idStatusPedido' é obrigatório",
                    false
                );
                return res.status(400).json(response);
            }

            const pedidos = await this.pedidoUseCase.executeGetPedidosByStatus(parseInt(idStatusPedido));

            const response = BasePresenter.presenterEntitysParaRespostaHttp(
                `Pedidos no status ${getDescricaoStatusPedido(parseInt(idStatusPedido))}`,
                true,
                pedidos
            );

            return res.status(200).json({ response });
        } catch (error: any) {
            const errorMessage = error?.message ||
                `Erro interno ao buscar os pedidos no status: ${getDescricaoStatusPedido(parseInt(idStatusPedido))}`;
            const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
        }
    }

    // TODO
    // - Refatorar fakecheckout
    // - No caso seria a finalização pedido, ou seja, a concretização da compra com o pagamento.
    // - Receber o id do pedido, consultar se existe 'Pagamento' e se está no status 'Pago'
    // - Se estiver pago mudar o status do pedido para finalizado
    // - Atualizar o swagger
    async getPedidoFakeCheckout(req: Request, res: Response) {
        const { status } = req.params;
        try {
            const pedido = await this.pedidoUseCase.executeGetPedidoFakeCheckout(status);
            return res.status(200).json({ pedido });
        } catch (error: any) {
            const errorMessage = error?.message || "Erro interno ao fazer o fake checkout";
            const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
        }
    }
    
    async addProdutosAoPedido(req: Request, res: Response) {
        const { listaProdutos } = req.body;
        const { idPedido } = req.params;

        try {
            if (!listaProdutos || !idPedido) {
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                    "Erro ao adicionar produto(s) ao pedido: os campos 'listaProdutos' e'idPedido' são obrigatórios",
                    false
                );
                return res.status(400).json(response);
            }

            const produtosDoPedido: ProdutosDoPedido[] = listaProdutos.map((produtoDoPedido: any) => ({
                pedidoId: parseInt(idPedido),
                ...produtoDoPedido
            }));

            const data = await this.pedidoUseCase.executeAddProdutosAoPedido(produtosDoPedido);
            

            const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                `${data?.count} produto(s) adicionado(s) ao pedido`,
                true
            );

            return res.status(200).json({ response });
        } catch (error: any) {
            const errorMessage = error?.message || "Erro interno ao adicionar produto(s) ao pedido";
            const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
        }
    }

    async removeProdutoDoPedido(req: Request, res: Response) {
        const { listaProdutos } = req.body;
        const { idPedido } = req.params;

        try {
            if (!listaProdutos || !idPedido) {
                const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                    "Erro ao remover produto(s) ao pedido: os campos 'listaProdutos' e'idPedido' são obrigatórios",
                    false
                );
                return res.status(400).json(response);
            }

            this.pedidoUseCase.executeRemoveProdutoDoPedido(parseInt(idPedido), listaProdutos);

            const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                `Produto(s) removido(s) do pedido ${idPedido}`,
                true
            );

            return res.status(200).json({ response });
        } catch (error: any) {
            const errorMessage = error?.message || "Erro interno ao adicionar produto(s) ao pedido";
            const response = this.basePresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
        }
    }

    async updatePedido(req: Request, res: Response) {
        const { body } = req;
        const { idPedido } = req.params;

        const statusPedido = body?.statusPedido;

        type UpdatePedidoDict = {
            [key: string]: (idPedido: number) => Promise<any>;
        };

        const updatePedidoDict: UpdatePedidoDict = {
            "Em Preparação":
                this.pedidoUseCase.executeUpdatePedidoPreparacao.bind(
                    this.pedidoUseCase
                ),
            Pronto: this.pedidoUseCase.executeUpdatePedidoPronto.bind(
                this.pedidoUseCase
            ),
            Finalizado: this.pedidoUseCase.executeUpdatePedidoFinalizado.bind(
                this.pedidoUseCase
            ),
        };

        if (!statusPedido) {
            return res
                .status(400)
                .json({ message: "statusPedido não informado" });
        }

        if (!idPedido) {
            return res.status(400).json({ message: "idPedido não informado" });
        }

        try {
            const updateFunction = updatePedidoDict[statusPedido];
            const update = await updateFunction(parseInt(idPedido));

            return res.status(200).json({ update });
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }
}

export default PedidoController;
