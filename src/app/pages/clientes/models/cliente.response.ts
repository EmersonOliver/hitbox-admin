import { EnderecoClienteResponse } from "./endereco.cliente.response";

export interface ClienteResponse {
    id: string;
    nome: string;
    documento: string;
    email: string;
    telefone: string;
    enderecos: EnderecoClienteResponse[];
}