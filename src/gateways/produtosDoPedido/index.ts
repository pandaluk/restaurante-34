
import { ProdutosDoPedido } from "@/entities/ProdutosDoPedido";
import { IProdutoDoPedidoGateway, IProdutosDoPedidoRepository } from "@/interfaces";

export class ProdutoDoPedidoGateway implements IProdutoDoPedidoGateway {
    private produtoDoPedidoRepository: IProdutosDoPedidoRepository;

    constructor(produtoDoPedidoRepository: IProdutosDoPedidoRepository) {
        this.produtoDoPedidoRepository = produtoDoPedidoRepository;
    }

    async createProdutosDoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any> {
        return this.produtoDoPedidoRepository.create(produtosDoPedido);
    }

    async deleteProdutosDoPedido(produtosDoPedido: ProdutosDoPedido[]): Promise<any> {
        return this.produtoDoPedidoRepository.delete(produtosDoPedido);
    }

    async getProdutosDoPedido(idPedido: number): Promise<ProdutosDoPedido[]> {
        return this.produtoDoPedidoRepository.get(idPedido);
    }
}
