import { Response, Request } from "express";

import {
    IClienteController,
    IClienteGateway,
    IClienteUseCase,
} from "@/interfaces";
import ClienteRepository from "@/external/repositories/ClienteRepository";
import { ClienteUseCase } from "@/usecases/cliente/ClienteUseCase";
import { ClienteGateway } from "@/gateways/cliente";

export default class ClienteController implements IClienteController {
    private clienteUseCase: IClienteUseCase;
    private clienteGateway: IClienteGateway;
    constructor(clienteRepository: ClienteRepository) {
        this.clienteGateway = new ClienteGateway(clienteRepository);
        this.clienteUseCase = new ClienteUseCase(this.clienteGateway);
    }

    async getClienteByCpf(req: Request, res: Response) {
        const { cpf } = req.params;

        if (!cpf) {
            return res
                .status(400)
                .json({ message: "Error buscar cliente, cpf vazio" });
        }

        try {
            const cliente = await this.clienteUseCase.executeGetByCpf(cpf);
            return res
                .status(200)
                .json({ message: "Sucesso buscar cliente", cliente });
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }

    async getClienteById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ message: "Error buscar cliente, id vazio" });
        }

        try {
            const cliente = await this.clienteUseCase.executeGetById(
                parseInt(id)
            );

            return res
                .status(200)
                .json({ message: "Sucesso buscar cliente", cliente });
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }

    async createCliente(req: Request, res: Response) {
        const requestBody = req.body;

        if (!requestBody) {
            return res
                .status(400)
                .json({ message: "Error criar cliente, body vazio" });
        }

        try {
            const cliente = await this.clienteUseCase.executeCreation(
                requestBody
            );

            return res
                .status(200)
                .json({ message: "Sucesso criar cliente", cliente });
        } catch (error: any) {
            return res.status(400).json({ message: error?.message });
        }
    }
}
