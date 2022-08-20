import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './shared/services/AuthGuard';
import { MenuInternoComponent } from './menu-interno/menu-interno.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuInicioComponent,
    PaginaInicialComponent,
    CadastroUsuarioComponent,
    LoginComponent,
    IndexComponent,
    MenuInternoComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
