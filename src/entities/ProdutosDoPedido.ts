
export interface ProdutosDoPedido {
    id: number;
    produtoId: string;
    pedidoId: number;
    quantidade: number;
    valor: number;
    createdAt: Date;
    updatedAt: Date;
}
