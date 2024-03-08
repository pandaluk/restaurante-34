import { Response, Request } from "express";
import { IProdutoController, IProdutoGateway, IProdutoUseCase } from "@/interfaces";
import { ProdutoPresenter } from "@/presenters/produto";
import { ProdutoUseCase } from "@/usecases/produto/ProdutoUseCase";
import ProdutoRepository from "@/external/repositories/ProdutoRepository";
import { ProdutoGateway } from "@/gateways/produto";
import { Produto } from "@/entities/Produto";

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
        try {
            const produtoData = req.body;

            if (!produtoData?.descricao || !produtoData?.preco || !produtoData?.categoriaProdutoId) {
                const response = this.produtoPresenter.presenterMensagemParaRespostaHttp(
                    "Erro ao criar produto: campos obrigatórios ausentes",
                    false
                );
                return res.status(400).json(response);
            }

            const produto: Produto = await this.produtoUseCase.executeCreation(produtoData);

            const response = this.produtoPresenter.presenterProdutoParaRespostaHttp(
                "Produto criado com sucesso",
                true,
                produto
            );

            return res.status(200).json(response);
        } catch (error: any) {
            const errorMessage = error.message || "Erro interno ao criar produto";
            const response = this.produtoPresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
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
