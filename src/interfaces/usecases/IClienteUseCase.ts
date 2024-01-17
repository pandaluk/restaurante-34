import { Cliente } from "@prisma/client";


export interface IClienteUseCase {
    executeCreation(clienteData: Cliente): Promise<Cliente>;
    executeGetByCpf(clienteId: string): Promise<Cliente>;
    executeGetById(id: number): Promise<Cliente>;
}
