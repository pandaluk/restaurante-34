
import { IProdutoDoPedidoGateway, IProdutosDoPedidoRepository } from "@/interfaces";
import { Produto } from "@prisma/client";


export class ProdutoDoPedidoGateway implements IProdutoDoPedidoGateway {
    private produtoDoPedidoRepository: IProdutosDoPedidoRepository;

    constructor(produtoDoPedidoRepository: IProdutosDoPedidoRepository) {
        this.produtoDoPedidoRepository = produtoDoPedidoRepository;
    }

    async createProdutoDoPedidoGateway(idPedido: number, produto: Produto[]): Promise<any>  {
        try {
            const novoProdutoDoPedido = await this.produtoDoPedidoRepository.create(
                idPedido, produto
            );

            return novoProdutoDoPedido;
        } catch (error) {
            throw new Error("Erro incluir Produto no Pedido!");
        }
    }

    async deleteProdutoDoPedidoGateway(
        idPedido: number, produto: Produto[]
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
