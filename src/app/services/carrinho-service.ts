import { computed, Service, signal } from '@angular/core';
import { Produto } from '../models/produto';

export type Item = {
  id: number;
  produto: Produto | undefined;
  quantidade: number;
};

@Service()
export class CarrinhoService {
  readonly #itens = signal<Item[]>([]);
  readonly itens = this.#itens.asReadonly();

  readonly qtdItens = computed(() =>
    this.#itens().reduce((total, item) => total + item.quantidade, 0)
  );

  adicionarItem(item: Item): void {
    if (!item || item.quantidade <= 0 || !item.produto) {
      return;
    }

    const produtoId = item.produto?.id ?? item.id;

    const itemExistente = this.#itens().find(
      (it) => it.id === item.id || it.produto?.id === produtoId
    );

    if (itemExistente) {
      this.aumentarQuantidade(item.id);
      return;
    }

    this.#itens.update((itens) => [...itens, item]);
  }

  aumentarQuantidade(itemId: number): void {
    this.#itens.update((itens) =>
      itens.map((item) =>
        item.id === itemId ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  }

  diminuirQuantidade(itemId: number): void {
    this.#itens.update((itens) =>
      itens.flatMap((item) => {
        if (item.id !== itemId) {
          return [item];
        }

        const novaQuantidade = item.quantidade - 1;
        return novaQuantidade > 0 ? [{ ...item, quantidade: novaQuantidade }] : [];
      })
    );
  }

  removerItem(itemId: number): void {
    this.#itens.update((itens) => itens.filter((item) => item.id !== itemId));
  }

  obterTotalCompra(): number {
    return this.#itens().reduce((total, item) => {
      if (!item.produto) {
        return total;
      }

      return total + item.produto.preco * item.quantidade;
    }, 0);
  }
}
