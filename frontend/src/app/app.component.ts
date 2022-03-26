import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from './core/services/usuario/usuario.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeticionesService } from './core/services/peticiones/peticiones.service';
import { UsuarioService } from './core/services/usuario/usuario.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  S_getAmigosActivos: Subscription;
  S_getUser: Subscription;

  constructor(
    private peticiones: PeticionesService,
    private usuario: UsuarioService,
    private swUpdate: SwUpdate,
    private router: Router
  ) {}

  ngOnInit() {
    if (document.cookie) {
      this.S_getAmigosActivos = this.peticiones
        .getAmigosActivos()
        .subscribe((data: []) => {
          this.usuario.amigosActivos = data;
          this.usuario.numAmigosActivos = data.length;
        });

      this.S_getUser = this.peticiones.getUser().subscribe((data: Usuario) => {
        this.usuario.datos = data;
      });
    }

    this.updatePWA();
  }

  ngOnDestroy() {
    this.S_getAmigosActivos.unsubscribe();
    this.S_getUser.unsubscribe();
  }

  updatePWA() {
    this.swUpdate.available.subscribe((value) => window.location.reload());
  }
}
