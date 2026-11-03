import { TestBed } from '@angular/core/testing';
import { CarrinhoService } from './carrinho-service';
import { Produto } from '../models/produto';

describe('CarrinhoService', () => {
  let service: CarrinhoService;
  const produto: Produto = {
    id: 1,
    nome: 'Camiseta',
    descricao: 'Camiseta de algodão',
    preco: 45,
    quantidade: 10,
    foto: 'camiseta.png',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar um item e calcular o total da compra', () => {
    service.adicionarItem({ id: produto.id, produto, quantidade: 2 });

    expect(service.itens().length).toBe(1);
    expect(service.obterTotalCompra()).toBe(90);
  });

  it('deve aumentar, diminuir e remover itens do carrinho', () => {
    service.adicionarItem({ id: produto.id, produto, quantidade: 1 });

    service.aumentarQuantidade(produto.id);
    expect(service.itens()[0].quantidade).toBe(2);

    service.diminuirQuantidade(produto.id);
    expect(service.itens()[0].quantidade).toBe(1);

    service.removerItem(produto.id);
    expect(service.itens()).toEqual([]);
  });
});
