import { IPagamentoGateway } from "@/interfaces/gateway/IPagamentoGateway";
import { IPagamentoRepository } from "@/interfaces/repositories/IPagamentoRepository";

export class PagamentoGateway implements IPagamentoGateway {
    private pagamentoRepository: IPagamentoRepository;
    
    constructor(pagamentoRepository: IPagamentoRepository) {
        this.pagamentoRepository = pagamentoRepository;
    }

    async createPagamentoGateway(pagamentoData: any): Promise<any> {
        try {
            const novoPagamento = await this.pagamentoRepository.create(pagamentoData);
            return novoPagamento;
        } catch (error) {
            throw new Error("Erro ao criar pagamento");
        }
    }
    async webhookUpdatePagamentoGateway(pagamentoId: number, status: number): Promise<any> {
        try {
            const novoPagamento = await this.pagamentoRepository.webhookUpdate(pagamentoId, status);
            return novoPagamento;
        } catch (error) {
            throw new Error("Erro ao atualizar o pagamento");
        }
    }
    async getPagamentoGateway(categoriaProdutoId: number): Promise<any> {
        try {
            const pagamento = await this.pagamentoRepository.get(categoriaProdutoId);
            return pagamento;
        } catch (error) {
            throw new Error("Erro ao localizar pagamento");
        }
    }
}