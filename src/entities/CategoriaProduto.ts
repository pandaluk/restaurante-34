import { Produto } from "./Produto";

interface CategoriaProduto {
    id: number;
    produto: Produto[];
    enumerador: string;
    createdAt: Date;
    updatedAt: Date;
}

export default CategoriaProduto;