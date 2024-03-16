
export interface IPedidoController{
    createPedido(req: any, res: any): any;
    getPedidoById(req: any, res: any): any;
    getPedidos(req: any, res: any): any;
    getPedidosByStatus(req: any, res: any): any;
    addProdutosAoPedido(req: any, res: any): any;

    removeProdutoDoPedido(req: any, res: any): any;
    updatePedido(req: any, res: any): any;
    getPedidoFakeCheckout(req: any, res: any): any;
}