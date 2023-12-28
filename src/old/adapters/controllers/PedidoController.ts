import { IPedidoController } from "./IPedidoController";
import { IPedidoUseCase } from "@/core/application/useCases/pedido/IPedidoUseCase";
import { Request, Response } from "express";

class PedidoController implements IPedidoController{
  private pedidoUseCase: IPedidoUseCase;

  constructor (pedidoUseCase: IPedidoUseCase){
    this.pedidoUseCase = pedidoUseCase;
  }

  async createPedido(req: Request, res: Response) {
    const { body } = req;

    try{
      const response = await this.pedidoUseCase.executeCreation(body);
      return res.status(200).json({ message: "Pedido criado com sucesso", response});
    }
    catch(error: any){
      return res.status(400).json({ message: error?.message });
    }
  }

  async getPedidoById(req: Request, res: Response) {
    const { idPedido } = req.params;

    try{
      const pedido = await this.pedidoUseCase.executeGetPedidoById(parseInt(idPedido));
      return res.status(200).json({  pedido });
    }
    catch(error: any){
      return res.status(400).json({ message: error?.message });
    }

  }

  async getPedidoByStatus(req: Request, res: Response) {
    const { status } = req.params;

    try{
      const pedido = await this.pedidoUseCase.executeGetPedidoByStatus(status);
      return res.status(200).json({  pedido });
    }
    catch(error: any){
      return res.status(400).json({ message: error?.message });
    }

  }

  async getPedidoFakeCheckout(req: Request, res: Response) {
    const { status } = req.params;

    try{
      const pedido = await this.pedidoUseCase.executeGetPedidoFakeCheckout(status);
      return res.status(200).json({ pedido });
    }
    catch(error: any){
      return res.status(400).json({ message: error?.message });
    }

  }

  async getPedidos(req: Request, res: Response) {
    try {

      const pedido = await this.pedidoUseCase.executeGetPedidos();

      return res.status(200).json({ pedido });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message });
    }
  }

  async addProdutoAoPedido(req: Request, res: Response) {
    const { listaProdutos } = req.body;
    const { idPedido } = req.params;

    try {
      const quantidadeProdutosAdicionados = await this.pedidoUseCase.executeAddProdutoAoPedido(parseInt(idPedido), listaProdutos);

      return res.status(200).json({ quantidadeProdutosAdicionados });
    } catch (error: any) {
      return res.status(400).json({ message: error?.message });
    }
  }

  async removeProdutoDoPedido(req: Request, res: Response) {
    const { listaProdutos } = req.body;
    const { idPedido } = req.params;

    try {
      this.pedidoUseCase.executeRemoveProdutoDoPedido(parseInt(idPedido), listaProdutos);
    } catch (error: any) {
      return res.status(400).json({ message: error?.message });
    }
  }

  async updatePedido(req: Request, res: Response) {
    const { body } = req;
    const { idPedido } = req.params;

    const statusPedido = body?.statusPedido;

    type UpdatePedidoDict = {
      [key: string]: (idPedido: number) => Promise<any>;
    };

    const updatePedidoDict: UpdatePedidoDict = {
      "Em Preparação": this.pedidoUseCase.executeUpdatePedidoPreparacao.bind(this.pedidoUseCase),
      "Pronto": this.pedidoUseCase.executeUpdatePedidoPronto.bind(this.pedidoUseCase),
      "Finalizado": this.pedidoUseCase.executeUpdatePedidoFinalizado.bind(this.pedidoUseCase),
    };


    if (!statusPedido) {
      return res.status(400).json({ message: "statusPedido não informado" });
    }

    if (!idPedido) {
      return res.status(400).json({ message: "idPedido não informado" });
    }


    try {
      const updateFunction = updatePedidoDict[statusPedido];
      const update = await updateFunction(parseInt(idPedido));

      return res.status(200).json({ update});
    } catch (error: any) {

      return res.status(400).json({ message: error?.message });
    }

  }
}

export default PedidoController;