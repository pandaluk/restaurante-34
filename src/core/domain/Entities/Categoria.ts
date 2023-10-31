enum Categoria{
    LANCHE = "Lanche",
    ACOMPANHAMENTO = "Acompanhamento",
    BEBIDA = "Bebida",

}

const CategoriaID: Record<Categoria, number> = {
    [Categoria.LANCHE]: 101,
    [Categoria.ACOMPANHAMENTO]: 102,
    [Categoria.BEBIDA]: 103
};