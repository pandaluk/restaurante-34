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
        try {
            const { categoriaProdutoId } = req.params;

            const produtos: Produto[] = await this.produtoUseCase.executeGetProdutoCategoria(parseInt(categoriaProdutoId, 10));

            const response = this.produtoPresenter.presenterProdutosParaRespostaHttp(
                `Produtos da categoria ${categoriaProdutoId}`,
                true,
                produtos
            );

            return res.status(200).json(response);
        } catch (error: any) {
            const errorMessage = error?.message || "Erro interno ao buscar os produtos";
            const response = this.produtoPresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
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

            return res.status(201).json(response);
        } catch (error: any) {
            const errorMessage = error?.message || "Erro interno ao criar o produto";
            const response = this.produtoPresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
        }
    }

    async updateProduto(req: Request, res: Response) {
        try {
            const produtoData = req.body;

            if (!produtoData?.id) {
                const response = this.produtoPresenter.presenterMensagemParaRespostaHttp(
                    "Erro ao atualizar produto: o campo 'id' é obrigatório",
                    false
                );
                return res.status(400).json(response);
            }

            const produto: Produto = await this.produtoUseCase.executeUpdate(produtoData);

            const response = this.produtoPresenter.presenterProdutoParaRespostaHttp(
                "Produto atualizado com sucesso",
                true,
                produto
            );

            return res.status(200).json(response);
        } catch (error: any) {
            const errorMessage = error?.message || "Erro interno ao atualizar o produto";
            const response = this.produtoPresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
        }
    }

    async deleteProduto(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                const response = this.produtoPresenter.presenterMensagemParaRespostaHttp(
                    "Erro ao excluir produto: o parâmetro 'id' é obrigatório",
                    false
                );
                return res.status(400).json(response);
            }

            await this.produtoUseCase.executeDelete(parseInt(id, 10));

            const response = this.produtoPresenter.presenterMensagemParaRespostaHttp(
                `Produto ${id} excluido com sucesso`,
                true
            );

            return res.status(200).json(response);
        } catch (error: any) {
            const errorMessage = error?.message || "Erro interno ao excluir o produto";
            const response = this.produtoPresenter.presenterMensagemParaRespostaHttp(
                errorMessage,
                false
            );
            return res.status(500).json(response);
        }
    }
}
