import { Application } from "express";
import ProdutoRoutes from "./produto";
import ProdutoController from "@/controllers/ProdutoController";
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
import HealthController from "@/controllers/HealthController";
import HealthRoutes from "./health";
import ProdutoRepository from "@/external/repositories/ProdutoRepository";
import PagamentoRepository from "@/external/repositories/PagamentoRepository";
import PagamentoController from "@/controllers/PagamentoController";
import PagamentoRoutes from "./pagamento";

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
        const produtoController = new ProdutoController(produtoRepository);
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
        );
        clienteRoutes.buildRoutes();

        const pedidoRepository = new PedidoRepository(this.prisma);
        const produtosDoPedidoRepository = new ProdutosDoPedidoRepository(this.prisma);
        const pedidoGateway = new PedidoGateway(pedidoRepository);
        const produtosDoPedidoGateway = new ProdutoDoPedidoGateway(produtosDoPedidoRepository);
        const pedidoUseCase = new PedidoUseCase(produtosDoPedidoGateway, pedidoGateway);
        const pedidoController = new PedidoController(pedidoUseCase);
        const pedidoRoutes = new PedidoRoutes(
            this.app,
            pedidoController,
            BASE_URL
        );
        pedidoRoutes.buildRoutes();

        const healthController = new HealthController();
        const healthRoutes = new HealthRoutes(
            this.app,
            healthController,
            BASE_URL
        );
        healthRoutes.buildRoutes();   

        const pagamentoRepository = new PagamentoRepository(this.prisma);        
        const pagamentoController = new PagamentoController(
            pagamentoRepository, 
            pedidoRepository, 
            produtosDoPedidoRepository
        );
        const pagamentoRoutes = new PagamentoRoutes(
            this.app,
            pagamentoController,
            BASE_URL
        );
        pagamentoRoutes.buildRoutes();
    }
}
