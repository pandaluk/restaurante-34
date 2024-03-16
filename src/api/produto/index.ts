import { IBuildRoutes, IProdutoController } from "@/interfaces";
import { CognitoVerifier } from "../auth/AuthMiddleware";

class ProdutoRoutes implements IBuildRoutes {
    private express: any;
    private produtoController: IProdutoController;
    private BASE_URL: string;
    private cognitoVerifier: CognitoVerifier;

    constructor(
        express: any,
        produtoController: IProdutoController,
        BASE_URL: string
    ) {
        this.express = express;
        this.produtoController = produtoController;
        this.BASE_URL = BASE_URL;
        this.cognitoVerifier = new CognitoVerifier();
    }

    buildRoutes() {
        this.express.get(
            `${this.BASE_URL}/produtos/categoria/:categoriaProdutoId`,
            this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier),
            this.produtoController.getProdutosCategoria.bind(
                this.produtoController
            )
        );
        this.express.post(
            `${this.BASE_URL}/produto`,
            this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier),
            this.produtoController.createProduto.bind(this.produtoController)
        );

        this.express.put(
            `${this.BASE_URL}/produto`,
            this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier),
            this.produtoController.updateProduto.bind(this.produtoController)
        );
        this.express.delete(
            `${this.BASE_URL}/produto/:id`,
            this.cognitoVerifier.verifyCognitoJWT.bind(this.cognitoVerifier),
            this.produtoController.deleteProduto.bind(this.produtoController)
        );
    }
}

export default ProdutoRoutes;
