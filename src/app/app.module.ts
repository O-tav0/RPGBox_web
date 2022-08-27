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
import * as $ from 'jquery';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './shared/services/AuthGuard';
import { MenuInternoComponent } from './menu-interno/menu-interno.component';
import { DetalheCampanhaComponent } from './detalhe-campanha/detalhe-campanha.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MenuInicioComponent,
    PaginaInicialComponent,
    CadastroUsuarioComponent,
    LoginComponent,
    IndexComponent,
    MenuInternoComponent,
    DetalheCampanhaComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    DialogModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
