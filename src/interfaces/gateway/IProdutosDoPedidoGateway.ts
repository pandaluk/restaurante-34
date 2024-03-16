import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";

export interface IProdutoDoPedidoGateway {
    createProdutosDoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any>;

    deleteProdutosDoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any>;
    getProdutosDoPedido(idPedido: number): Promise<any>;
}
