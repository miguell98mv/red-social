import { io } from 'socket.io-client';
import { UsuarioService } from './../../core/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { SelectAmigoService } from '../../core/services/select-amigo/select-amigo.service';
import { PeticionesService } from '../../core/services/peticiones/peticiones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-amigos-activos-600',
  templateUrl: './amigos-activos-600.component.html',
  styleUrls: ['./amigos-activos-600.component.scss'],
})
export class AmigosActivosComponent600 implements OnInit, OnDestroy {
  event: any;

  constructor(
    private selectAmigo: SelectAmigoService,
    private router: Router,
    private peticiones: PeticionesService,
    public usuario: UsuarioService,
    private render: Renderer2
  ) {
    this.event = render.listen('window', 'resize', () => {
      if (window.innerWidth > 600) {
        this.router.navigate(['/home']);
      }
    });

    if (window.innerWidth > 600) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy(): void {
    window.removeAllListeners();
    this.event();
  }

  ngOnInit(): void {
    const socket = io(environment.socket);

    socket.on('connect', () => {
      // console.log(`connection ${socket.id}`);
    });

    socket.on(`${this.usuario.datos?.id}-amigosActivos`, (data: []) => {
      this.usuario.numAmigosActivos = data.length;
      this.usuario.amigosActivos = data;
    });
  }

  log(idUser: any) {
    this.selectAmigo.id = idUser;
  }
}
