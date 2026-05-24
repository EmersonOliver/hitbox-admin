import { ClienteEnderecoModel } from "./cliente.endereco.model";

export interface ClienteModel {
        nome: string;
        documento: string;
        email: string;
        telefone: string;
        enderecos: ClienteEnderecoModel[];
}