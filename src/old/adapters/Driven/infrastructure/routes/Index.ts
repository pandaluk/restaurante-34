import { Application } from "express";
import ClienteRepository from "@/old/adapters/Driver/ClienteRepository";
import { CreateClienteUseCase } from "@/old/core/application/useCases/cliente/ClienteUseCase";
import ClienteRoutes from "./ClienteRoutes";
import { prisma } from "../database";

import ProdutoRepository from "@/old/adapters/Driver/ProdutoRepository";
import { CreateProdutoUseCase } from "@/old/core/application/useCases/produto/ProdutoUseCase";
import ProdutoRoutes from "./ProdutoRoutes";
import ProdutoController from "@/old/adapters/controllers/ProdutoController";
import ClienteController from "@/old/adapters/controllers/ClienteController";
import PedidoRepository from "@/old/adapters/Driver/PedidoRepository";
import PedidoUseCase from "@/old/core/application/useCases/pedido/PedidoUseCase";
import ProdutosDoPedido from "@/old/adapters/Driver/ProdutosDoPedido";
import PedidoRoutes from "./PedidoRoutes";
import PedidoController from "@/old/adapters/controllers/PedidoController";

const BASE_URL = "/api";

export default function routes(app: Application) {
    const clienteRepository = new ClienteRepository(prisma);
    const createClienteUseCase = new CreateClienteUseCase(clienteRepository);
    const clienteController = new ClienteController(createClienteUseCase);
    const clienteRoutes = new ClienteRoutes(app, clienteController, BASE_URL);

    clienteRoutes.buildRoutes();

    const produtoRepository = new ProdutoRepository(prisma);
    const createProdutoUseCase = new CreateProdutoUseCase(produtoRepository);
    const produtoController = new ProdutoController(createProdutoUseCase);
    const produtoRoutes = new ProdutoRoutes(app, produtoController, BASE_URL);

    produtoRoutes.buildRoutes();

    const pedidoRepository = new PedidoRepository(prisma);
    const produtosDoPeidoRepository = new ProdutosDoPedido(prisma);
    const pedidoUseCase = new PedidoUseCase(
        produtosDoPeidoRepository,
        pedidoRepository
    );
    const pedidoController = new PedidoController(pedidoUseCase);
    const pedidoRoutes = new PedidoRoutes(app, pedidoController, BASE_URL);

    pedidoRoutes.buildRoutes();
}
