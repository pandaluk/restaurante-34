import Cliente from "@/entities/Cliente";


export interface IClienteGateway {
    createClienteGateway(clienteData: Cliente): Promise<Cliente> ;
    getClienteCPFGateway(clienteCPF: string): Promise<Cliente>;
    getById(clienteId: number): Promise<Cliente>;
}
