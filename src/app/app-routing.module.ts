import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnotacoesCampanhaComponent } from './anotacoes-campanha/anotacoes-campanha.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CombatesCampanhaComponent } from './combates-campanha/combates-campanha.component';
import { DetalheCampanhaComponent } from './detalhe-campanha/detalhe-campanha.component';
import { GenrenciarCombateComponent } from './genrenciar-combate/genrenciar-combate.component';
import { HistoricoCampanhaComponent } from './historico-campanha/historico-campanha.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PersonagensCampanhaComponent } from './personagens-campanha/personagens-campanha.component';
import { AuthGuard } from './shared/services/AuthGuard';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'cadastrar', component: CadastroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard] },
  {
    path: 'detalhesCampanha/:sqCampanha',
    component: DetalheCampanhaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'campanha/:sqCampanha/personagens',
    component: PersonagensCampanhaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'campanha/:sqCampanha/combates',
    component: CombatesCampanhaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'campanha/:sqCampanha/anotacoes',
    component: AnotacoesCampanhaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'campanha/:sqCampanha/linhaDoTempo',
    component: HistoricoCampanhaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'combate/:sqCombate/gerenciar',
    component: GenrenciarCombateComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
