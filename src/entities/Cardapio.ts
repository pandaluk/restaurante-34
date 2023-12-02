import { ProdutosDoCardapio } from "@prisma/client";

class Cardapio {
    constructor(
        public id: number,
        public produtosDoCardapio: ProdutosDoCardapio[],
        public descricao: string,
        public ativo: boolean,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}