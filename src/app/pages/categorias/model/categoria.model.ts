export interface CategoriaModel {
    id?: number;
    nome: string;
    tipo: 'OPERACIONAL' | 'INSUMO' | 'VENDA'
    descricao?: string;
    ativo: boolean;
}
