import { IClienteRoutes } from "@/adapters/Driven/infrastructure/routes/IClienteRoutes";
import { IClienteController } from "@/adapters/controllers/IClienteController";
import JsonSchemaMiddleware from "../middlewares/jsonSchemaValidation/base/JsonSchemaMiddleware";
import { ClientePostSchema } from "../middlewares/jsonSchemaValidation/schemas/ClienteSchema";

class ClienteRoutes implements IClienteRoutes {
    private express: any;
    private clienteController: IClienteController;
    private postPayloadValidator = new JsonSchemaMiddleware(ClientePostSchema);
    private BASE_URL: string;
    constructor(
        express: any,
        clienteController: IClienteController,
        BASE_URL: string
    ) {
        this.express = express;
        this.clienteController = clienteController;
        this.BASE_URL = BASE_URL;
    }

    buildRoutes() {
        this.express
            .get(
                `${this.BASE_URL}/cliente/:cpf/`,
                this.clienteController.getClienteByCpf.bind(
                    this.clienteController
                )
            )
            .get(
                `${this.BASE_URL}/cliente/id/:id/`,
                this.clienteController.getClienteById.bind(
                    this.clienteController
                )
            )
            .post(
                `${this.BASE_URL}/cliente`,
                this.postPayloadValidator.validateSchema.bind(
                    this.postPayloadValidator
                ),
                this.clienteController.createCliente.bind(
                    this.clienteController
                )
            );
    }
}

export default ClienteRoutes;
