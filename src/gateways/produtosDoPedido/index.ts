
import ProdutosDoPedido from "@/entities/ProdutosDoPedido";
import { IProdutoDoPedidoGateway, IProdutosDoPedidoRepository } from "@/interfaces";



export class ProdutoDoPedidoGateway implements IProdutoDoPedidoGateway {
    private produtoDoPedidoRepository: IProdutosDoPedidoRepository;

    constructor(produtoDoPedidoRepository: IProdutosDoPedidoRepository) {
        this.produtoDoPedidoRepository = produtoDoPedidoRepository;
    }

    async createProdutoDoPedidoGateway(produtosDoPedido: ProdutosDoPedido): Promise<any>  {
        const { idPedido, listaProdutos } = produtosDoPedido;
        try {
            const novoProdutoDoPedido = await this.produtoDoPedidoRepository.create(
                idPedido, listaProdutos
            );

            return novoProdutoDoPedido;
        } catch (error) {
            throw new Error("Erro incluir Produto no Pedido!");
        }
    }

    async deleteProdutoDoPedidoGateway(
        idPedido: number, produto: ProdutosDoPedido[]
    ): Promise<any> {
        try {
            const deleteProdutoDoPedido = await this.produtoDoPedidoRepository.delete(
                idPedido, produto
            );
            return deleteProdutoDoPedido;
        } catch (error) {
            throw new Error(
                `Erro ao deletar Produto do Pedido ${idPedido}`
            );
        }
    }
}
