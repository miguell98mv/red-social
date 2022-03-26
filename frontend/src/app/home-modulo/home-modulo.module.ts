import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { HomeComponent } from './home.component';
import { AmigosOpcionalesComponent } from './amigos-opcionales/amigos-opcionales.component';
import { BuscarComponent } from './buscar/buscar.component';
import { AmigosEncontradosComponent } from './buscar/amigos-encontrados/amigos-encontrados.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MensajeAmigoComponent } from './mensajes/mensaje-amigo/mensaje-amigo.component';
import { TodosMensajesAmigoComponent } from './mensajes/todos-mensajes-amigo/todos-mensajes-amigo.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { SectionNoticacionComponent } from './notificaciones/section-noticacion/section-noticacion.component';
import { SectionSolicitudComponent } from './all-solicitudes/section-solicitud/section-solicitud.component';
import { AllSolicitudesComponent } from './all-solicitudes/all-solicitudes.component';
import { AmigosActivosComponent600 } from './amigos-activos-600/amigos-activos-600.component';
import { AmigoActivoComponent600 } from './amigos-activos-600/amigo-activo-600/amigo-activo-600.component';
import { AmigoActivoMensajesComponent600 } from './amigos-activos-600/amigo-activo-mensajes-600/amigo-activo-mensajes-600.component';
import { ContentAllMensajesComponent } from './mensajes/todos-mensajes-amigo/content-all-mensajes/content-all-mensajes.component';

@NgModule({
  declarations: [
    HomeComponent,
    AmigosOpcionalesComponent,
    BuscarComponent,
    AmigosEncontradosComponent,
    MensajesComponent,
    MensajeAmigoComponent,
    TodosMensajesAmigoComponent,
    NotificacionesComponent,
    SectionNoticacionComponent,
    SectionSolicitudComponent,
    AllSolicitudesComponent,
    AmigosActivosComponent600,
    AmigoActivoComponent600,
    AmigoActivoMensajesComponent600,
    ContentAllMensajesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    SharedModule,
    InfiniteScrollModule,
  ],
})
export class HomeModuloModule {}
