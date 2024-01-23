import { Pagamento } from "@prisma/client";

export interface IPagamentoGateway {
    createPagamentoGateway(pagamentoData: any): Promise<Pagamento>;
    webhookUpdatePagamentoGateway(pagamentoId: number, status: number): Promise<Pagamento>;
    getPagamentoGateway(pagamentoId: number): Promise<Pagamento>;
}
