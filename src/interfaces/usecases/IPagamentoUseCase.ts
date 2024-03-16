import Pagamento from "@/entities/Pagamento";

export interface IPagamentoUseCase {
    executeCreation(idPedido: number): Promise<Pagamento>;
    executeWebhookUpdate(pagamentoId: number, status: number): Promise<Pagamento>;
    executeGetPagamento(pagamentoId: number): Promise<Pagamento>;
}