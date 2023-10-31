enum StatusPagamento{
    APROVADO = "Aprovado",
    CANCELADO = "Cancelado",
    AGUARDANDO_PAGAMENTO = "Aguardando pagamento",
    FALHA_NO_PAGAMENTO = "Falha no pagamento",

}

const StatusPagamentoID: Record<StatusPagamento, number> = {
    [StatusPagamento.APROVADO]: 101,
    [StatusPagamento.CANCELADO]: 102,
    [StatusPagamento.AGUARDANDO_PAGAMENTO]: 103,
    [StatusPagamento.FALHA_NO_PAGAMENTO]: 104
};