export interface IClienteController {
    getClienteByCpf(req: any, res: any): any;
    getClienteById(req: any, res: any):any;
    createCliente(req: any, res: any): any; 
}