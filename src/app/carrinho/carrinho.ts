import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Item, CarrinhoService } from '../services/carrinho-service';

@Component({
  imports: [DecimalPipe],
  selector: 'app-carrinho',
  styleUrl: './carrinho.scss',
  templateUrl: './carrinho.html',
})
export class Carrinho {
  private readonly router = inject(Router);
  protected readonly carrinhoService = inject(CarrinhoService);
  readonly quantidade = computed(() => this.carrinhoService.qtdItens());

  get estaNaPaginaCarrinho(): boolean {
    return this.router.url === '/carrinho';
  }

  irParaCarrinho(): void {
    this.router.navigate(['/carrinho']);
  }

  aumentarQuantidade(item: Item): void {
    this.carrinhoService.aumentarQuantidade(item.id);
  }

  diminuirQuantidade(item: Item): void {
    this.carrinhoService.diminuirQuantidade(item.id);
  }

  removerItem(itemId: number): void {
    this.carrinhoService.removerItem(itemId);
  }

  obterTotal(): number {
    return this.carrinhoService.obterTotalCompra();
  }
}
