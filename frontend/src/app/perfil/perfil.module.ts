import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AmigosComponent } from './amigos/amigos.component';
import { SectionAmigosComponent } from './amigos/section-amigos/section-amigos.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';

@NgModule({
  declarations: [
    PerfilComponent,
    AmigosComponent,
    SectionAmigosComponent,
    ConfiguracionesComponent,
    SobreMiComponent,
  ],
  imports: [CommonModule, PerfilRoutingModule, SharedModule],
})
export class PerfilModule {}
