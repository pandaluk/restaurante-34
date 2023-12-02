enum TipoAcesso{
    USUARIO = "Usuario",
    ADMINISTRATIVO = "Administrativo",
}

const TipoAcessoID: Record<TipoAcesso, number> = {
    [TipoAcesso.USUARIO]: 101,
    [TipoAcesso.ADMINISTRATIVO]: 102
};