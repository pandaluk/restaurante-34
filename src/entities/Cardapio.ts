import ProdutosDoCardapio from "./ProdutosDoCardapio";

class Cardapio {
    id: number;
    produtosDoCardapio: ProdutosDoCardapio[];
    descricao: string;
    ativo: boolean;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      produtosDoCardapio: ProdutosDoCardapio[],
      descricao: string,
      ativo: boolean,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.produtosDoCardapio = produtosDoCardapio;
      this.descricao = descricao;
      this.ativo = ativo;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  export default Cardapio;