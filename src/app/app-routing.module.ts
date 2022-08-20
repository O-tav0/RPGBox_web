import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { AuthGuard } from './shared/services/AuthGuard';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'cadastrar', component: CadastroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
