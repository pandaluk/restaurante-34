
import { Pedido } from "./Pedido";
import Usuario from "./Usuario";

class Cliente {
  id: number;
  usuarioId: number;
  usuario: Usuario;
  pedido: Pedido[];
  nome: string | null;
  email: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
   
  constructor(
    id: number,
    usuarioId: number,
    usuario: Usuario,
    pedido: Pedido[],
    nome: string | null,
    email: string,
    cpf: string,
    createdAt: Date,
    updatedAt: Date
  ){
    this.id = id;
    this.usuarioId = usuarioId;
    this.usuario = usuario;
    this.pedido = pedido;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

  }
}

export default Cliente;