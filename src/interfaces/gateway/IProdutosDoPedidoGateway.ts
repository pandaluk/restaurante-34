import ProdutosDoPedido from "@/entities/ProdutosDoPedido";
import { Pedido } from "@prisma/client";

export interface IProdutoDoPedidoGateway {
    createProdutoDoPedidoGateway(produtosDoPedido: ProdutosDoPedido): Promise<any>;
    deleteProdutoDoPedidoGateway(idPedido: number, produto: ProdutosDoPedido[]): Promise<Pedido>;
}
