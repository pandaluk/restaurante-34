import Produto from "@/entities/produto";

export interface IProdutoPresenter {
    getProdutosPresenter(produtos: Produto[]): Produto[];
    presenterMensagemParaRespostaHttp(mensagem: string, sucesso: boolean): any;
}