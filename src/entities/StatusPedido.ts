export enum StatusPedido{
    RECEBIDO = "Recebido",
    EM_PREPARACAO = "Em Preparação",
    PRONTO = "Pronto",
    FINALIZADO = "Finalizado",

}

const StatusPedidoID: Record<StatusPedido, number> = {
    [StatusPedido.RECEBIDO]: 101,
    [StatusPedido.EM_PREPARACAO]: 102,
    [StatusPedido.PRONTO]: 103,
    [StatusPedido.FINALIZADO]: 104
};