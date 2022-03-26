import { environment } from './../../../environments/environment';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';
import { SelectAmigoService } from '../../core/services/select-amigo/select-amigo.service';
import { PeticionesService } from '../../core/services/peticiones/peticiones.service';
import { io } from 'socket.io-client';
import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-amigo-activo-mensajes',
  templateUrl: './amigo-activo-mensajes.component.html',
  styleUrls: ['./amigo-activo-mensajes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmigoActivoMensajesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('ultimoAmigos') ultimoAmigos: ElementRef<HTMLElement>;
  @ViewChild('amigoActivo') amigoActivo: ElementRef<HTMLElement>;
  @Output() myClick: EventEmitter<any> = new EventEmitter();

  nombre = 'Miguel Valero';
  mensajes: any;
  numMensajes: number;
  nameUser: Observable<any>;
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
    private render: Renderer2
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

    this.nameUser = this.peticiones.getNameUser(this.selectAmigo.id);
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
