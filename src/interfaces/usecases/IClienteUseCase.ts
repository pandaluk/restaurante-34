import Cliente from "@/entities/Cliente";

export interface IClienteUseCase {
    executeCreation(clienteData: Cliente): Promise<Cliente>;
    executeGetByCpf(clienteId: string): Promise<Cliente>;
    executeGetById(id: number): Promise<Cliente>;
}
