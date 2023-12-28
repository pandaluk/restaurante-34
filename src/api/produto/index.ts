import express from "express";
import { IProdutoRoutes } from "@/old/adapters/Driven/infrastructure/routes/IProdutoRoutes";
import { IProdutoController } from "@/old/adapters/controllers/IProdutoController";

export class ProdutoRoutes {
    private produtoController: IProdutoController;
    private BASE_URL: string;
    private app = express();

    constructor(produtoController: IProdutoController, BASE_URL: string) {
        this.produtoController = produtoController;
        this.BASE_URL = BASE_URL;
    }

    buildRoutes() {
        this.app.get(
            `${this.BASE_URL}/produtos/categoria/:categoriaProdutoId`,

            this.produtoController.getProdutosCategoria.bind(
                this.produtoController
            )
        );
    }
}
