import { PeticionesService } from './../../core/services/peticiones/peticiones.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SelectAmigoService } from '../../core/services/select-amigo/select-amigo.service';
import { io } from 'socket.io-client';
import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-amigos-activos',
  templateUrl: './amigos-activos.component.html',
  styleUrls: ['./amigos-activos.component.scss'],
})
export class AmigosActivosComponent implements OnInit, AfterViewInit {
  amigosActivos: Array<any>;
  totalAmigos: number = 1;

  constructor(
    private selectAmigo: SelectAmigoService,
    public usuario: UsuarioService,
    private peticiones: PeticionesService
  ) {}

  ngOnInit(): void {}

  log(idUser: any) {
    this.selectAmigo.id = idUser;
  }

  ngAfterViewInit(): void {
    this.sockets();
  }

  sockets() {
    this.peticiones.getUser().subscribe((data: any) => {
      const socket = io(environment.socket);

      socket.on('connect', () => {
        // console.log(`connection ${socket.id}`);
      });

      socket.on(`${data.id}-amigosActivos`, (data: []) => {
        this.usuario.numAmigosActivos = data.length;
        this.usuario.amigosActivos = data;
      });
    });
  }
}
