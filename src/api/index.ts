import { Application } from "express";
import ProdutoRoutes from "./produto";
import { ProdutoUseCase } from "@/usecases/produto/ProdutoUseCase";
import ProdutoRepository from "@/external/repositories/ProdutoRepository";
import ProdutoController from "@/controllers/ProdutoController";
import { ProdutoGateway } from "@/gateways/produto";
import { PrismaClient } from "@prisma/client";

const BASE_URL = "/api";

export class routes {
    private app: Application;
    private prisma: PrismaClient;

    constructor(app: Application, prisma: PrismaClient) {
        this.app = app;
        this.prisma = prisma;
        this.setupRoutes();
    }
    private setupRoutes() {
        // gateway aqui? trata as informacoes para inserir ou retornar do banco
        const produtoRepository = new ProdutoRepository(this.prisma);
        const produtoGateway = new ProdutoGateway(produtoRepository);
        const produtoUseCase = new ProdutoUseCase(produtoGateway);
        const produtoController = new ProdutoController(produtoUseCase);
        const produtoRoutes = new ProdutoRoutes(
            this.app,
            produtoController,
            BASE_URL
        );

        produtoRoutes.buildRoutes();
    }
}
