import { Request, Response } from "express";

export interface IPedidoController{
    createPedido(req: Request, res: Response): any;
    getPedidoById(req: Request, res: Response): any;
    getPedidos(req: Request, res: Response): any;
    addProdutoAoPedido(req: Request, res: Response): any;
    removeProdutoDoPedido(req: Request, res: Response): any;
    updatePedido(req: Request, res: Response): any;
    getPedidoByStatus(req: Request, res: Response): any;
    getPedidoFakeCheckout(req: Request, res: Response): any;
}