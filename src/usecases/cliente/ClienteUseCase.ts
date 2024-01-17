
import { IClienteGateway } from "@/interfaces";
import { IClienteUseCase } from "@/interfaces/usecases/IClienteUseCase";
import { Cliente } from "@prisma/client";



export class ClienteUseCase implements IClienteUseCase {
    private clienteGateway: IClienteGateway;

    constructor(clienteGateway: IClienteGateway) {
        this.clienteGateway = clienteGateway;
    }

    async executeCreation(clienteData: Cliente): Promise<Cliente> {
        try {
            // Aqui você pode adicionar lógica de validação ou manipulação de dados, se necessário.

            // Chame o método create do repositório para criar um novo cliente
            const novoCliente = await this.clienteGateway.createClienteGateway(
                clienteData
            );

            return novoCliente;
        } catch (error) {
            // Lide com erros ou exceções, se necessário.
            throw error;
        }
    }

    async executeGetByCpf(cpf: string): Promise<Cliente> {
        try {
            // Aqui você pode adicionar lógica de validação ou manipulação de dados, se necessário.

            // Chame o método create do repositório para criar um novo cliente
            const foundCliente = await this.clienteGateway.getClienteCPFGateway(cpf);

            if (!foundCliente) {
                throw new Error("Cliente não encontrado");
            }

            return foundCliente;
        } catch (error) {
            // Lide com erros ou exceções, se necessário.
            throw error;
        }
    }
    async executeGetById(id: number): Promise<Cliente> {
        try {
            const foundCliente = await this.clienteGateway.getById(id);
            if (!foundCliente) {
                throw new Error("Cliente não encontrado");
            }
            return foundCliente;
        } catch (error) {
            throw error;
        }
    }
}
