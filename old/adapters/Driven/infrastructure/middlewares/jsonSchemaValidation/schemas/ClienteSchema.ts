import { JSONSchema4 } from "json-schema";

const ClientePostSchema = {
  type: "object",
  properties: {
      nome: { type: "string", required: true },
      cpf: { type: "string", required: true },
      email: { type: "string", required: true },
      
  }
} as JSONSchema4;


export {
  ClientePostSchema
};