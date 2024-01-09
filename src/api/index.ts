import { Application } from "express";
import ProdutoRoutes from "./produto";
import { ProdutoUseCase } from "@/usecases/produto/ProdutoUseCase";
import ProdutoRepository from "@/external/repositories/ProdutoRepository";
import ProdutoController from "@/controllers/ProdutoController";
import { ProdutoGateway } from "@/gateways/produto";
import { PrismaClient } from "@prisma/client";
import ClienteRepository from "@/external/repositories/ClienteRepository";
import { ClienteGateway } from "@/gateways/cliente";
import { ClienteUseCase } from "@/usecases/cliente/ClienteUseCase";
import ClienteController from "@/controllers/ClienteController";
import ClienteRoutes from "./cliente";
import PedidoRepository from "@/external/repositories/PedidoRepository";
import { PedidoGateway } from "@/gateways/pedido";
import PedidoUseCase from "@/usecases/pedido/PedidoUseCase";
import ProdutosDoPedidoRepository from "@/external/repositories/ProdutosDoPedidoRepository";
import { ProdutoDoPedidoGateway } from "@/gateways/produtosDoPedido";
import PedidoController from "@/controllers/PedidoController";
import PedidoRoutes from "./pedido";

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
        const produtoGateway = new ProdutoGateway(produtoRepository);
        const produtoUseCase = new ProdutoUseCase(produtoGateway);
        const produtoController = new ProdutoController(produtoUseCase);
        const produtoRoutes = new ProdutoRoutes(
            this.app,
            produtoController,
            BASE_URL
        );
        produtoRoutes.buildRoutes();

        const clienteRepository = new ClienteRepository(this.prisma);
        const clienteGateway = new ClienteGateway(clienteRepository);
        const clienteUseCase = new ClienteUseCase(clienteGateway);
        const clienteController = new ClienteController(clienteUseCase);
        const clienteRoutes = new ClienteRoutes(
            this.app,
            clienteController,
            BASE_URL
        )
        clienteRoutes.buildRoutes()

        const pedidoRepository = new PedidoRepository(this.prisma);
        const produtosDoPedidoRepository = new ProdutosDoPedidoRepository(this.prisma)
        const pedidoGateway = new PedidoGateway(pedidoRepository);
        const produtosDoPedidoGateway = new ProdutoDoPedidoGateway(produtosDoPedidoRepository)
        const pedidoUseCase = new PedidoUseCase(produtosDoPedidoGateway, pedidoGateway);
        const pedidoController = new PedidoController(pedidoUseCase);
        const pedidoRoutes = new PedidoRoutes(
            this.app,
            pedidoController,
            BASE_URL
        )
        pedidoRoutes.buildRoutes()
    }

}
