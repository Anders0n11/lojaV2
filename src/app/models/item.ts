import { Produto } from './produto';

export class Item {
    id: number;
    produto: Produto | undefined;
    quantidade: number;

    constructor(prod: Produto | undefined, qtd: number, id?: number) {
        this.id = id ?? prod?.id ?? 0;
        this.produto = prod;
        this.quantidade = qtd;
    }
}