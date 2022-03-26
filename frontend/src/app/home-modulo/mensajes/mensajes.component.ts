import { Subscription } from 'rxjs';
import { io } from 'socket.io-client';
import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { PeticionesService } from '../../core/services/peticiones/peticiones.service';
import { SelectAmigoService } from '../../core/services/select-amigo/select-amigo.service';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensajesComponent implements OnInit, OnDestroy {
  chatAmigos: any;
  private subs: Subscription[] = [];
  forms: FormGroup = new FormGroup({
    amigo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(
    private peticiones: PeticionesService,
    private selectAmigo: SelectAmigoService,
    private router: Router,
    private usuario: UsuarioService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const socket = io(environment.socket);
    socket.on('connect', () => {});
    socket.on(`${this.usuario.datos?.id}-chatMensajes`, (data: any[]) => {
      this.subs.push(
        this.peticiones.getChatUser().subscribe((data: any) => {
          data.sort(function (a, b) {
            return b.fecha - a.fecha;
          });

          this.chatAmigos = data;
          this.cambios.detectChanges();
        })
      );
    });

    this.subs.push(
      this.peticiones.getChatUser().subscribe((data: any) => {
        data.sort(function (a, b) {
          return b.fecha - a.fecha;
        });

        this.chatAmigos = data;
        this.cambios.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
  }
  log(data) {
    this.selectAmigo.id = data.chat;
    this.router.navigate([`/mensajes/${data.chat}`]);
  }

  buscarAmigo() {
    if (!this.forms.controls.amigo.errors) {
      this.subs.push(
        this.peticiones
          .search(this.forms.controls.amigo.value)
          .subscribe((data) => {
            this.subs.push(
              this.peticiones.mensajeAmigo(data).subscribe((datos) => {
                this.chatAmigos = datos;
                this.cambios.detectChanges();
              })
            );
            this.cambios.detectChanges();
          })
      );
    }

    if (this.forms.controls.amigo.errors && !this.forms.controls.amigo.value) {
      this.subs.push(
        this.peticiones.getChatUser().subscribe((data: any) => {
          data.sort(function (a, b) {
            return b.fecha - a.fecha;
          });

          this.chatAmigos = data;
          this.cambios.detectChanges();
        })
      );
    }
  }
}
