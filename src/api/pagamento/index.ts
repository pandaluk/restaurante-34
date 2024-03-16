import { IBuildRoutes } from "@/interfaces";
import { IPagamentoController } from "@/interfaces/controllers/IPagamentoController";
import { CognitoVerifier } from "../auth/AuthMiddleware";

export default class PagamentoRoutes implements IBuildRoutes {
    private express: any;
    private pagamentoController: IPagamentoController;
    private BASE_URL: string;
    private cognitoVerifier: CognitoVerifier;

    constructor(
        express: any,
        pagamentoController: IPagamentoController,
        BASE_URL: string
    ) {
        this.express = express;
        this.pagamentoController = pagamentoController;
        this.BASE_URL = BASE_URL;
        this.cognitoVerifier = new CognitoVerifier();
    }

    buildRoutes() {
        this.express.post(
            `${this.BASE_URL}/pagamento`,
            this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier),
            this.pagamentoController.createPagamento.bind(
                this.pagamentoController
            )
        );

        this.express.post(
            `${this.BASE_URL}/webhook/pagamento`,
            this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier),
            this.pagamentoController.webhookUpdatePagamento.bind(
                this.pagamentoController
            )
        );

        this.express.get(
            `${this.BASE_URL}/pagamento/:pagamentoId`,
            this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier),
            this.pagamentoController.getPagamento.bind(this.pagamentoController)
        );
    }
}
