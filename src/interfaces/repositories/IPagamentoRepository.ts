import { Pagamento } from "@prisma/client";

export interface IPagamentoRepository {
    create(pagamento: Pagamento): Promise<Pagamento>;
    webhookUpdate(pagamentoId: number, status: number): Promise<Pagamento>;
    get(pagamentoId: number): Promise<Pagamento>;    
}