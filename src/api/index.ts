import { Application } from "express";
import { ProdutoRoutes } from "./produto";
import { CreateProdutoUseCase } from "@/usecases/produto/ProdutoUseCase";
import ProdutoRepository from "@/old/adapters/Driver/ProdutoRepository";
import ProdutoController from "@/old/adapters/controllers/ProdutoController";
import { prisma } from "@/external/database";

const BASE_URL = "/api";

export default function routes(app: Application) {
    const produtoRepository = new ProdutoRepository(prisma);
    const createProdutoUseCase = new CreateProdutoUseCase(produtoRepository);
    const produtoController = new ProdutoController(createProdutoUseCase);
    const produtoRoutes = new ProdutoRoutes(app, produtoController, BASE_URL);

    produtoRoutes.buildRoutes();
}
