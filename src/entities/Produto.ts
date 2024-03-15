
import { CategoriaProduto, ProdutosDoCardapio } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

class Produto {
  id: number;
  descricao: string;
  preco: Decimal;
  categoriaProdutoId: number;
  produtosDoCardapio: ProdutosDoCardapio[];
  produtosDoPedido: ProdutosDoCardapio[];
  categoriaProduto: CategoriaProduto;
  quantidade: number;
  valor: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    descricao: string,
    preco: Decimal,
    categoriaProdutoId: number,
    produtosDoCardapio: ProdutosDoCardapio[],
    produtosDoPedido: ProdutosDoCardapio[],
    categoriaProduto: CategoriaProduto,
    quantidade: number,
    valor: number,
    createdAt: Date,
    updatedAt: Date
  ){
    this.id = id;
    this.descricao = descricao;
    this.preco = preco;
    this.categoriaProdutoId = categoriaProdutoId;
    this.produtosDoCardapio = produtosDoCardapio;
    this.produtosDoPedido = produtosDoPedido;
    this.categoriaProduto = categoriaProduto;
    this.quantidade = quantidade;
    this.valor = valor;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

  }
}

export default Produto;