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
import { MegaMenuModule } from 'primeng/megamenu';
import { PersonagensCampanhaComponent } from './personagens-campanha/personagens-campanha.component';
import { AnotacoesCampanhaComponent } from './anotacoes-campanha/anotacoes-campanha.component';
import { CombatesCampanhaComponent } from './combates-campanha/combates-campanha.component';
import { HistoricoCampanhaComponent } from './historico-campanha/historico-campanha.component';
import {TimelineModule} from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {DividerModule} from 'primeng/divider';
import {SidebarModule} from 'primeng/sidebar';
import {PickListModule} from 'primeng/picklist';
import {DropdownModule} from 'primeng/dropdown';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TooltipModule} from 'primeng/tooltip';


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
    PersonagensCampanhaComponent,
    AnotacoesCampanhaComponent,
    CombatesCampanhaComponent,
    HistoricoCampanhaComponent,
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
    MegaMenuModule,
    TimelineModule,
    CardModule,
    AccordionModule,
    DividerModule,
    SidebarModule,
    PickListModule,
    DropdownModule,
    ScrollPanelModule,
    VirtualScrollerModule,
    PanelModule,
    ToastModule,
    InputTextModule,
    OverlayPanelModule,
    TooltipModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
