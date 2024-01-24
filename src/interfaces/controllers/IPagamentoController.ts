export interface IPagamentoController {
    createPagamento(req: any, res: any): any;
    webhookUpdatePagamento(req: any, res: any): any;
    getPagamento(req: any, res: any): any;
}