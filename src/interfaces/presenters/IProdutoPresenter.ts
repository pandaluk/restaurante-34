import { Produto } from "@prisma/client"

export interface IProdutoPresenter {
    getProdutosPresenter(produtos: Produto[]): Produto[];
    presenterMensagemParaRespostaHttp(mensagem: string, sucesso: boolean): any;
}