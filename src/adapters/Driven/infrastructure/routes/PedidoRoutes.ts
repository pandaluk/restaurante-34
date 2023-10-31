import { IpedidoRoutes } from "./IPedidoRoutes";
import { IPedidoController } from "@/adapters/controllers/IPedidoController";

class PedidoRoutes implements IpedidoRoutes {
    private express: any;
    private pedidoController: IPedidoController;
    private BASE_URL: string;

    constructor(
        express: any,
        produtoController: IPedidoController,
        BASE_URL: string
    ) {
        this.express = express;
        this.pedidoController = produtoController;
        this.BASE_URL = BASE_URL;
    }

    buildRoutes() {
        console.log("Building pedido routes");

        this.express.post(
            `${this.BASE_URL}/pedido`,
            this.pedidoController.createPedido.bind(this.pedidoController)
        )
        .post(
            `${this.BASE_URL}/pedido/:idPedido/produto`,
            this.pedidoController.addProdutoAoPedido.bind(this.pedidoController)
        )
        .delete(
            `${this.BASE_URL}/pedido/:idPedido/produto`,
            this.pedidoController.removeProdutoDoPedido.bind(this.pedidoController)
        )
        .get(
            `${this.BASE_URL}/pedidos`,
            this.pedidoController.getPedidos.bind(this.pedidoController)
        )
        .get(
            `${this.BASE_URL}/pedido/:idPedido`,
            this.pedidoController.getPedidoById.bind(this.pedidoController)
        )
        .get(
            `${this.BASE_URL}/pedido/status/:status`,
            this.pedidoController.getPedidoByStatus.bind(this.pedidoController)
        )

        .get(
            `${this.BASE_URL}/pedido/status/:status`,
            this.pedidoController.getPedidoByStatus.bind(this.pedidoController)
        )

        .get(
            `${this.BASE_URL}/pedido/status/fakecheckout/:status`,
            this.pedidoController.getPedidoFakeCheckout.bind(this.pedidoController)
        )

        .patch(
            `${this.BASE_URL}/pedido/:idPedido/alterar-status`,
            this.pedidoController.updatePedido.bind(this.pedidoController)
        );
    }
}

export default PedidoRoutes;
