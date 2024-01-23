import { Response, Request } from "express";
import { IProdutoController, IProdutoGateway, IProdutoUseCase } from "@/interfaces";
import { ProdutoPresenter } from "@/presenters/produto";
import { ProdutoUseCase } from "@/usecases/produto/ProdutoUseCase";
import ProdutoRepository from "@/external/repositories/ProdutoRepository";
import { ProdutoGateway } from "@/gateways/produto";
import Produto from "@/entities/produto";

export default class ProdutoController implements IProdutoController {
    private produtoUseCase: IProdutoUseCase;
    private produtoGateway: IProdutoGateway;
    private produtoPresenter = new ProdutoPresenter();

    constructor(produtoRepository: ProdutoRepository) {
        this.produtoGateway = new ProdutoGateway(produtoRepository);
        this.produtoUseCase = new ProdutoUseCase(this.produtoGateway);
    }

    async getProdutosCategoria(req: Request, res: Response) {
        const { categoriaProdutoId } = req.params;
        try {
            const getProduto: Produto[] =
                await this.produtoUseCase.executeGetProdutoCategoria(
                    parseInt(categoriaProdutoId, 10)
                );
            const responseProduto =
                this.produtoPresenter.getProdutosPresenter(getProduto);

            return res.status(200).json(responseProduto);
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }

    async createProduto(req: Request, res: Response) {
        const requestBody = req.body;
        if (!requestBody) {
            const responseProduto =
                this.produtoPresenter.presenterMensagemParaRespostaHttp(
                    "Error criar produto, body vazio",
                    false
                );
            return res.status(400).json(responseProduto);
        }

        try {
            const produto = await this.produtoUseCase.executeCreation(
                requestBody
            );

            const responseProduto =
                this.produtoPresenter.presenterMensagemParaRespostaHttp(
                    "Sucesso criar produto",
                    true
                );
            return res.status(200).json({ responseProduto, produto });
        } catch (error: any) {
            const responseProduto =
                this.produtoPresenter.presenterMensagemParaRespostaHttp(
                    error?.message,
                    false
                );
            return res.status(400).json(responseProduto);
        }
    }

    async updateProduto(req: Request, res: Response) {
        try {
            const requestBody = req.body;

            const produto = await this.produtoUseCase.executeUpdate(
                requestBody
            );
            const responseProduto =
                this.produtoPresenter.presenterMensagemParaRespostaHttp(
                    "Sucesso ao atualizar o produto",
                    true
                );
            return res.status(200).json({ responseProduto, produto });
        } catch (error) {
            const mensagemAdaptada =
                this.produtoPresenter.presenterMensagemParaRespostaHttp(
                    "Ops, algo de errado aconteceu!",
                    false
                );
            return res.status(400).json(mensagemAdaptada);
        }
    }

    async deleteProduto(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.produtoUseCase.executeDelete(parseInt(id, 10));

            const responseProduto =
                this.produtoPresenter.presenterMensagemParaRespostaHttp(
                    "Sucesso ao deletar o produto",
                    true
                );
            return res.status(200).json(responseProduto);
        } catch (error: any) {
            const responseProduto =
                this.produtoPresenter.presenterMensagemParaRespostaHttp(
                    error?.message,
                    false
                );
            return res.status(400).json(responseProduto);
        }
    }
}
