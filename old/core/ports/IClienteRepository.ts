// ClienteRepository.ts (interface)

import { Cliente } from "../domain/Entities/Cliente";

export interface IClienteRepository {
    create(cliente: Cliente): Promise<Cliente>;
    getByCpf(cpf: string): Promise<Cliente>;
    getById(id: number): Promise<Cliente>;
}
