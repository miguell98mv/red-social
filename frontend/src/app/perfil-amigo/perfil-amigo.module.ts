import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilAmigoComponent } from './perfil-amigo.component';
import { PerfilAmigoRoutingModule } from './perfil-amigo-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AmigosComponent } from './amigos/amigos.component';
import { SectionAmigosComponent } from './amigos/section-amigos/section-amigos.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';
import { PerfilHomeAmigoComponent } from './perfil-home-amigo/perfil-home-amigo.component';

@NgModule({
  declarations: [
    PerfilAmigoComponent,
    AmigosComponent,
    SectionAmigosComponent,
    SobreMiComponent,
    PerfilHomeAmigoComponent,
  ],
  imports: [CommonModule, PerfilAmigoRoutingModule, SharedModule],
})
export class PerfilAmigoModule {}
