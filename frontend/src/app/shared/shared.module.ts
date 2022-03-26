import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NotificacionComponent } from './menu/notificacion/notificacion.component';
import { MenuComponent } from './menu/menu.component';
import { SolicitudesComponent } from './menu/solicitudes/solicitudes.component';
import { MensajeAmigoComponent } from './menu/mensaje-amigo/mensaje-amigo.component';
import { PerfilHomeComponent } from './perfil-home/perfil-home.component';
import { AmigosActivosComponent } from './amigos-activos/amigos-activos.component';
import { AmigoActivoComponent } from './amigos-activos/amigo-activo/amigo-activo.component';
import { AmigoActivoMensajesComponent } from './amigo-activo-mensajes/amigo-activo-mensajes.component';
import { PostComponent } from './post/post.component';
import { ComentariosComponent } from './post/comentarios/comentarios.component';
import { UnComentarioComponent } from './post/un-comentario/un-comentario.component';
import { NoPostComponent } from './no-post/no-post.component';

@NgModule({
  declarations: [
    NotificacionComponent,
    MenuComponent,
    SolicitudesComponent,
    MensajeAmigoComponent,
    PerfilHomeComponent,
    AmigosActivosComponent,
    AmigoActivoComponent,
    AmigoActivoMensajesComponent,
    PostComponent,
    ComentariosComponent,
    UnComentarioComponent,
    NoPostComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    NotificacionComponent,
    MenuComponent,
    SolicitudesComponent,
    MensajeAmigoComponent,
    PerfilHomeComponent,
    AmigosActivosComponent,
    AmigoActivoComponent,
    AmigoActivoMensajesComponent,
    PostComponent,
    ComentariosComponent,
    UnComentarioComponent,
    NoPostComponent,
  ],
})
export class SharedModule {}
