import { IBuildRoutes } from "@/interfaces";
import { IPagamentoController } from "@/interfaces/controllers/IPagamentoController";

export default class PagamentoRoutes implements IBuildRoutes {
    private express: any;
    private pagamentoController: IPagamentoController;
    private BASE_URL: string;

    constructor(
        express: any,
        pagamentoController: IPagamentoController,
        BASE_URL: string
    ) {
        this.express = express;
        this.pagamentoController = pagamentoController;
        this.BASE_URL = BASE_URL;
    }

    buildRoutes() {
        this.express.post(
            `${this.BASE_URL}/pagamento`,
            this.pagamentoController.createPagamento.bind(this.pagamentoController)
        );

        this.express.post(
            `${this.BASE_URL}/webhook/pagamento`,
            this.pagamentoController.webhookUpdatePagamento.bind(this.pagamentoController)
        );

        this.express.get(
            `${this.BASE_URL}/pagamento/:pagamentoId`,
            this.pagamentoController.getPagamento.bind(this.pagamentoController)
        );
    }
}