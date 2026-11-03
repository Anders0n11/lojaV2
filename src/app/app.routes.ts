import { Routes } from '@angular/router';
import { Carrinho } from './carrinho/carrinho';
import { ProdutoDetalhe } from './produto-detalhe/produto-detalhe';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [
    { path: 'produtos', component: Inicio },
    { path: 'produtos/:id', component: ProdutoDetalhe },
    { path: 'carrinho', component: Carrinho },
    { path: '', redirectTo: '/produtos', pathMatch: 'full' }
];
