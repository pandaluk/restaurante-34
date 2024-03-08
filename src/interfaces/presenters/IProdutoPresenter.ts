import { Produto } from "@/entities/Produto";

export interface IProdutoPresenter {
    getProdutosPresenter(produtos: Produto[]): Produto[];
    presenterMensagemParaRespostaHttp(mensagem: string, sucesso: boolean): any;
    presenterProdutoParaRespostaHttp(message: string, success: boolean, produto: Produto): any;
}