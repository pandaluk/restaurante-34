import { Pagamento } from "@prisma/client";

export interface IPagamentoUseCase {
    executeCreation(idPedido: number): Promise<Pagamento>;
    executeWebhookUpdate(pagamentoId: number, status: number): Promise<Pagamento>;
    executeGetPagamento(pagamentoId: number): Promise<Pagamento>;
}