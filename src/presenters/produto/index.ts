import { Produto } from "@/entities/Produto";
import { IProdutoPresenter } from "@/interfaces/presenters/IProdutoPresenter";

import { format } from "date-fns";
import { BasePresenter } from "../BasePresenter";

export class ProdutoPresenter extends BasePresenter implements IProdutoPresenter {
  presenterProdutosParaRespostaHttp(message: string, success: boolean, produtos: Produto[]): any {
    if (success) {
      return {
        success: true,
        mensagem: message,
        produtos: produtos.map((produto: Produto) => ({
          id: produto.id,
          categoriaProdutoId: produto.categoriaProdutoId,
          descricao: produto.descricao,
          preco: produto.preco,
          createdAt: format(new Date(produto.createdAt), "dd/MM/yyyy HH:mm:ss"),
          updatedAt: format(new Date(produto.updatedAt), "dd/MM/yyyy HH:mm:ss"),
        }))
      };
    } else {
      return {
        success: false,
        message: message
      };
    }
  }

  presenterProdutoParaRespostaHttp(message: string, success: boolean, produto: Produto): any {
    if (success) {
      return {
        success: true,
        message: message,
        produto: {
          id: produto.id,
          descricao: produto.descricao,
          preco: produto.preco,
          categoriaProdutoId: produto.categoriaProdutoId,
          createdAt: format(new Date(produto.createdAt), "dd/MM/yyyy HH:mm:ss"),
          updatedAt: format(new Date(produto.updatedAt), "dd/MM/yyyy HH:mm:ss"),
        }
      };
    } else {
      return {
        success: false,
        message: message
      };
    }
  }
}
