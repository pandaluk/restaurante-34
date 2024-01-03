import { Response, Request } from "express";
import { CreateProdutoUseCase } from "@/usecases/produto/ProdutoUseCase";
import { IProdutoController } from "@/old/adapters/controllers/IProdutoController";

export default class ProdutoController implements IProdutoController {
    private createProdutoUseCase: CreateProdutoUseCase;

    constructor(CreateProdutoUseCase: any) {
        this.createProdutoUseCase = CreateProdutoUseCase;
    }

    async getProdutosCategoria(req: Request, res: Response) {
        const { categoriaProdutoId } = req.params;
        try {
            const getProduto =
                await this.createProdutoUseCase.executeGetProdutoCategoria(
                    parseInt(categoriaProdutoId, 10)
                );

            return res.status(200).json(getProduto);
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }

    async createProduto(req: Request, res: Response) {
        const requestBody = req.body;
        if (!requestBody) {
            return res
                .status(400)
                .json({ message: "Error criar produto, body vazio" });
        }

        try {
            const produto = await this.createProdutoUseCase.executeCreation(
                requestBody
            );

            return res
                .status(200)
                .json({ message: "Sucesso criar produto", produto });
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }
    async updateProduto(req: Request, res: Response) {
        try {
            const requestBody = req.body;

            const produto = await this.createProdutoUseCase.executeUpdate(
                requestBody
            );
            return res
                .status(200)
                .json({ message: "Sucesso ao atualizar o produto", produto });
        } catch (error) {
            return res
                .status(400)
                .json({ message: "Ops, algo de errado aconteceu!" });
        }
    }

    async deleteProduto(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.createProdutoUseCase.executeDelete(parseInt(id, 10));

            return res
                .status(200)
                .json({ message: "Sucesso ao deletar o produto" });
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }
}
