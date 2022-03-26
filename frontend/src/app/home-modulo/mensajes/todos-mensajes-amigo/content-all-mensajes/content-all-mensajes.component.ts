import { Subscription } from 'rxjs';
import { SelectAmigoService } from './../../../../core/services/select-amigo/select-amigo.service';
import { UsuarioService } from './../../../../core/services/usuario/usuario.service';
import { PeticionesService } from './../../../../core/services/peticiones/peticiones.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { io } from 'socket.io-client';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content-all-mensajes',
  templateUrl: './content-all-mensajes.component.html',
  styleUrls: ['./content-all-mensajes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentAllMensajesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('ultimoMensajes') ultimoMensajes: ElementRef<HTMLElement>;
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  mensajes: any[];
  numMensajes: number;
  params: string;
  nameUser: string;
  assets: string = 'https://bucket-80hwyd.s3.amazonaws.com/';
  imagen: string = null;
  subs: Subscription[] = [];
  listen: any;
  forms = new FormGroup({
    mensaje: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private peticiones: PeticionesService,
    public usuario: UsuarioService,
    private render: Renderer2,
    private cambios: ChangeDetectorRef,
    private router: Router,
    private selectAmigo: SelectAmigoService
  ) {}

  ngOnInit(): void {
    const socket = io(environment.socket);

    socket.on('connect', () => {
      // console.log(`connection ${socket.id}`);
    });

    socket.on(`${this.usuario.datos?.id}-mensajes`, (data: any[]) => {
      data = data.map((e: any) => {
        e.fecha = new Date(e.fecha).toLocaleDateString();
        return e;
      });

      this.numMensajes = data.length;
      this.mensajes = data.reverse();
      this.cambios.detectChanges();
    });

    this.route.children[0].params.subscribe((params) => {
      this.params = params.idAmigo;
      this.subs.push(
        this.peticiones
          .getMensajeAmigo(params.idAmigo)
          .subscribe((data: any[]) => {
            data = data.map((e: any) => {
              e.fecha = new Date(e.fecha).toLocaleDateString();
              return e;
            });

            this.mensajes = data.reverse();
            this.numMensajes = data.length;
            this.cambios.detectChanges();
          })
      );

      this.subs.push(
        this.peticiones
          .getPersonUser(params.idAmigo)
          .subscribe((datos: any) => {
            this.nameUser = datos.nameUser;
            if (datos.imagen) {
              this.imagen = datos.imagen;
              this.spanImagen.nativeElement.src = this.assets + this.imagen;
              this.spanImagen.nativeElement.classList.remove('d-none');
            }
            this.cambios.detectChanges();
          })
      );
    });
  }

  ngAfterViewInit(): void {
    this.listen = this.render.listen(
      this.ultimoMensajes.nativeElement,
      'focus',
      () => {
        this.subs.push(
          this.peticiones.visto(this.mensajes[0].chat).subscribe(() => {
            this.cambios.detectChanges();
          })
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
    this.listen();
  }

  scrollInto() {
    this.ultimoMensajes.nativeElement.scrollIntoView();
  }

  addMensaje(formulario: HTMLFormElement) {
    if (!this.forms.controls.mensaje.errors) {
      let data = {
        toUser: this.params,
        mensaje: this.forms.controls.mensaje.value,
      };
      formulario.mensaje.value = '';

      this.subs.push(
        this.peticiones.addMensajeAmigo(data).subscribe(() => {
          this.cambios.detectChanges();
        })
      );
    }
    this.cambios.detectChanges();
  }

  atras() {
    this.selectAmigo.displayAllMensajes = false;
    this.router.navigate(['/mensajes']);
  }
}
