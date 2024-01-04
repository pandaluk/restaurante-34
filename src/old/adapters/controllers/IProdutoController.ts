import { Request, Response } from "express";
export interface IProdutoController {
    createProduto(req: Request, res: Response): any;
    updateProduto(req: Request, res: Response): any;
    deleteProduto(req: Request, res: Response): any;
    getProdutosCategoria(req: Request, res: Response): any;
}
