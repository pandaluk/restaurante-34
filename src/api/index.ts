import { Application } from "express";
import ProdutoRoutes from "./produto";
import { CreateProdutoUseCase } from "@/usecases/produto/ProdutoUseCase";
import ProdutoRepository from "@/old/adapters/Driver/ProdutoRepository";
import ProdutoController from "@/old/adapters/controllers/ProdutoController";
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
        const produtoRepository = new ProdutoRepository(this.prisma);
        const createProdutoUseCase = new CreateProdutoUseCase(
            produtoRepository
        );
        const produtoController = new ProdutoController(createProdutoUseCase);
        const produtoRoutes = new ProdutoRoutes(
            this.app,
            produtoController,
            BASE_URL
        );

        produtoRoutes.buildRoutes();
    }
}
