const EnumStatusPedido: { [key: string]: any } = {
    RECEBIDO: { id: 1, descricao: "Recebido" },
    EM_PREPARACAO: { id: 2, descricao: "Em Preparação" },
    PRONTO: { id: 3, descricao: "Pronto" },
    FINALIZADO: { id: 4, descricao: "Finalizado" }
};

function getDescricaoStatusPedido(codigo: number): string | undefined {
    for (const status in EnumStatusPedido) {
        if (EnumStatusPedido[status].id === codigo) {
            return EnumStatusPedido[status].descricao;
        }
    }
    return undefined;
}

export { EnumStatusPedido, getDescricaoStatusPedido };