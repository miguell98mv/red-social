import { Router } from '@angular/router';
import { UsuarioService } from './../../../core/services/usuario/usuario.service';
import { PeticionesService } from './../../../core/services/peticiones/peticiones.service';
import { io } from 'socket.io-client';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  Renderer2,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SelectAmigoService } from '../../../core/services/select-amigo/select-amigo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-amigo-activo-mensajes-600',
  templateUrl: './amigo-activo-mensajes-600.component.html',
  styleUrls: ['./amigo-activo-mensajes-600.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmigoActivoMensajesComponent600
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('ultimoAmigos') ultimoAmigos: ElementRef<HTMLElement>;
  @ViewChild('amigoActivo') amigoActivo: ElementRef<HTMLElement>;
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  @Output() myClick: EventEmitter<any> = new EventEmitter();

  nombre = 'Miguel Valero';
  mensajes: any;
  numMensajes: number;
  nameUser: string;
  assets: string = 'https://bucket-80hwyd.s3.amazonaws.com/';
  imagenPost: string;
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
    public selectAmigo: SelectAmigoService,
    private peticiones: PeticionesService,
    public usuario: UsuarioService,
    private cambios: ChangeDetectorRef,
    private render: Renderer2,
    private router: Router
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

    this.peticiones
      .getMensajeAmigo(this.selectAmigo.id)
      .subscribe((data: any[]) => {
        data = data.map((e: any) => {
          e.fecha = new Date(e.fecha).toLocaleDateString();
          return e;
        });
        this.mensajes = data.reverse();
        this.numMensajes = data.length;
        this.cambios.detectChanges();
      });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 600) {
        this.router.navigate(['/home']);
      }
    });

    this.subs.push(
      this.peticiones
        .getPersonUser(this.selectAmigo.id)
        .subscribe((datos: any) => {
          this.nameUser = datos.nameUser;
          if (datos.imagen) {
            this.imagen = datos.imagen;
            this.spanImagen.nativeElement.classList.remove('d-none');
            this.spanImagen.nativeElement.src = this.assets + this.imagen;
          }
          this.cambios.detectChanges();
        })
    );
  }

  ngAfterViewInit() {
    this.selectAmigo.fideIn(this.amigoActivo.nativeElement);

    this.listen = this.render.listen(
      this.ultimoAmigos.nativeElement,
      'focus',
      () => {
        this.subs.push(
          this.peticiones.visto(this.mensajes[0].chat).subscribe(() => {})
        );
      }
    );

    document
      .querySelectorAll('.alturaPantalla')
      .forEach((element: HTMLElement) => {
        element.style.height = window.innerHeight - 110 + 'px';

        window.addEventListener('resize', () => {
          element.style.height = window.innerHeight - 110 + 'px';
        });
      });
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
    this.selectAmigo.displayNone = false;
  }

  eventClick() {
    this.myClick.emit(this.nombre);
    this.selectAmigo.fideOut(this.amigoActivo.nativeElement);
    setTimeout(() => {
      this.selectAmigo.displayNone = false;
    }, 100);
  }

  addMensaje(formulario: HTMLFormElement) {
    console.log(this.forms.controls.mensaje.value);
    if (!this.forms.controls.mensaje.errors) {
      let data = {
        toUser: this.selectAmigo.id,
        mensaje: this.forms.controls.mensaje.value,
      };
      formulario.mensaje.value = '';
      this.peticiones.addMensajeAmigo(data).subscribe((data) => {});
    }
  }

  scrollInto() {
    this.ultimoAmigos.nativeElement.scrollIntoView();
    window.onload = () => {
      this.ultimoAmigos.nativeElement.scrollIntoView();
    };
  }
}
