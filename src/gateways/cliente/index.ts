
import { IClienteGateway, IClienteRepository } from "@/interfaces";


export class ClienteGateway implements IClienteGateway {
    private ClienteRepository: IClienteRepository;

    constructor(ClienteRepository: IClienteRepository) {
        this.ClienteRepository = ClienteRepository;
    }

    async createClienteGateway(clienteData: any): Promise<any>  {
        try {
            const novoCliente = await this.ClienteRepository.create(
                clienteData
            );



            return novoCliente;
        } catch (error) {
            throw new Error("Erro ao criar Cliente!");
        }
    }

    async getClienteCPFGateway(
        clienteCPF: string
    ): Promise<any> {
        try {
            const getCliente = await this.ClienteRepository.getByCpf(
                clienteCPF
            );
            return getCliente;
        } catch (error) {
            throw new Error(
                `Erro ao obter Clientes da categoria ${clienteCPF}`
            );
        }
    }

    async getById(clienteId: number): Promise<any> {
        try {
            const getCliente = await this.ClienteRepository.getById(
                clienteId
            );
            return getCliente;
        } catch (error) {
            throw new Error(
                `Erro ao obter Clientes da categoria ${clienteId}`
            );
        } 
    }
}
