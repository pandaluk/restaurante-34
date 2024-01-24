import Produto from "@/entities/Produto";
import { IProdutoPresenter } from "@/interfaces/presenters/IProdutoPresenter";

import { format } from "date-fns";
export class ProdutoPresenter implements IProdutoPresenter{
    getProdutosPresenter(produtos: Produto[]): Produto[] {
        const CategoriaProduto = produtos.map((produto: Produto) => ({
            id: produto.id,
            categoriaProdutoId: produto.categoriaProdutoId,
            descricao: produto.descricao,
            preco: produto.preco,
            createdAt: format(
                new Date(produto.createdAt),
                "dd/MM/yyyy HH:mm:ss"
            ),
            updatedAt: format(
                new Date(produto.updatedAt),
                "dd/MM/yyyy HH:mm:ss"
            ),
        }));
        return CategoriaProduto as any;
    }
    presenterMensagemParaRespostaHttp(mensagem: string, sucesso: boolean): any {
        return {
            status: sucesso ? "sucesso" : "erro",
            mensagem: mensagem,
        };
    }
}
