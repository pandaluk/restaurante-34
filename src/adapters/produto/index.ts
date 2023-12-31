import { Produto } from "@prisma/client";

import { format } from "date-fns";
export class ProdutoAdapter {
    getProdutosAdapter(produtos: Produto[]): Produto[] {
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
    adaptMensagemParaRespostaHttp(mensagem: string, sucesso: boolean): any {
        return {
            status: sucesso ? "sucesso" : "erro",
            mensagem: mensagem,
        };
    }
}
