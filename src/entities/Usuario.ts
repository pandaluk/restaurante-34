
import Cliente from "./Cliente";
import Funcionario from "./Funcionario";

class Usuario {
    constructor(
        public id: number,
        public tipoAcesso: TipoAcesso,
        public login: string,
        public senha: string,
        public createdAt: Date,
        public updatedAt: Date,
        public funcionario?: Funcionario,
        public cliente?:Cliente,
    ) {}
}

export default Usuario;