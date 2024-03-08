import { Produto } from "@/entities/Produto";

export interface IProdutoPresenter {
    presenterProdutosParaRespostaHttp(message: string, success: boolean, produtos: Produto[]): any;
    presenterProdutoParaRespostaHttp(message: string, success: boolean, produto: Produto): any;
}