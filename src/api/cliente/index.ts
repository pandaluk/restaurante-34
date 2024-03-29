import { IBuildRoutes, IClienteController } from "@/interfaces";
import JsonSchemaMiddleware from "./middlewares/jsonSchemaValidation/base/JsonSchemaMiddleware";
import { ClientePostSchema } from "./middlewares/jsonSchemaValidation/schemas/ClienteSchema";
import { CognitoVerifier } from "../auth/AuthMiddleware";

class ClienteRoutes implements IBuildRoutes {
    private express: any;
    private clienteController: IClienteController;
    private postPayloadValidator = new JsonSchemaMiddleware(ClientePostSchema);
    private BASE_URL: string;
    private cognitoVerifier: CognitoVerifier;

    constructor(
        express: any,
        clienteController: IClienteController,
        BASE_URL: string
    ) {
        this.express = express;
        this.clienteController = clienteController;
        this.BASE_URL = BASE_URL;
        this.cognitoVerifier = new CognitoVerifier();
    }

    buildRoutes() {
        this.express
            .get(
                `${this.BASE_URL}/cliente/:cpf/`,
                this.cognitoVerifier.verifyCognitoJWT.bind(
                    this.cognitoVerifier
                ),
                this.clienteController.getClienteByCpf.bind(
                    this.clienteController
                )
            )
            .get(
                `${this.BASE_URL}/cliente/id/:id/`,
                this.cognitoVerifier.verifyCognitoJWT.bind(
                    this.cognitoVerifier
                ),
                this.clienteController.getClienteById.bind(
                    this.clienteController
                )
            )
            .post(
                `${this.BASE_URL}/cliente`,
                // this.postPayloadValidator.validateSchema.bind(
                //     this.postPayloadValidator
                // ),
                this.clienteController.createCliente.bind(
                    this.clienteController
                )
            );
    }
}

export default ClienteRoutes;
