
export interface EnderecoClienteResponse {
    id: number;
    clienteId: string;
    tipo: 'RESIDENCIAL' | 'COMERCIAL' | 'ENTREGA' | 'COBRANCA';
    endereco: string;
    cep: string;
    numero: number;
    bairro: string;
    cidade: string;
    complemento: string;
    observacoes: string;
}