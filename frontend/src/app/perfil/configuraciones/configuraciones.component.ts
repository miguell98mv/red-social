import { Subscription } from 'rxjs';
import { UsuarioService } from './../../core/services/usuario/usuario.service';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguracionesComponent implements OnInit, OnDestroy {
  nombre;
  contrasena;
  notificaciones;
  estado;
  privacidad;
  subs: Subscription[] = [];
  listens: any[] = [];

  constructor(
    private peticiones: PeticionesService,
    public usuario: UsuarioService,
    private cambios: ChangeDetectorRef,
    private render: Renderer2
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });

    this.listens?.forEach((listen) => {
      listen();
    });
  }

  showEdit(
    e: HTMLInputElement,
    cambiar: HTMLElement,
    cancelar: HTMLElement,
    guardar: HTMLElement,
    nombre: string
  ) {
    this.asignar(e, nombre);
    e.removeAttribute('disabled');
    e.setAttribute('placeholder', '');
    e.focus();
    cambiar.classList.add('d-none');
    cancelar.classList.remove('d-none');
    guardar.classList.remove('d-none');
  }

  cancelar(
    e: HTMLInputElement,
    cambiar: HTMLElement,
    cancelar: HTMLElement,
    guardar: HTMLElement,
    nombre: string
  ) {
    cambiar.classList.remove('d-none');
    cancelar.classList.add('d-none');
    guardar.classList.add('d-none');
    e.setAttribute('disabled', '');
    e.value = '';
    e.setAttribute('placeholder', this.obtenerPlaceholder(nombre));
  }

  guardar(
    e: HTMLInputElement,
    cambiar: HTMLElement,
    cancelar: HTMLElement,
    guardar: HTMLElement,
    metodo: string = '',
    eOpcional: HTMLInputElement | any = '',
    error: HTMLElement | any = '',
    success: HTMLElement | any = ''
  ) {
    if (metodo === 'nombre') {
      this.subs.push(
        this.peticiones.addNombre({ nameUser: e.value }).subscribe(() => {
          this.usuario.datos.nameUser = e.value;
          cambiar.classList.remove('d-none');
          cancelar.classList.add('d-none');
          guardar.classList.add('d-none');
          e.setAttribute('disabled', '');
          e.setAttribute('placeholder', e.value);
          e.value = '';
          this.cambios.detectChanges();
        })
      );
    } else if (metodo === 'password') {
      this.subs.push(
        this.peticiones
          .editPassword({ passwordO: eOpcional.value, password: e.value })
          .subscribe(
            (data) => {
              cambiar.classList.remove('d-none');
              cancelar.classList.add('d-none');
              guardar.classList.add('d-none');
              e.setAttribute('disabled', '');
              e.setAttribute('placeholder', 'Escriba nueva contraseña');
              eOpcional.setAttribute(
                'placeholder',
                'Escriba su contraseña original'
              );
              eOpcional.value = '';
              e.value = '';
              success.classList.remove('d-none');
              this.listens.push(
                this.render.listen('window', 'click', () => {
                  success.classList.add('d-none');
                })
              );
              this.cambios.detectChanges();
            },
            () => {
              cambiar.classList.remove('d-none');
              cancelar.classList.add('d-none');
              guardar.classList.add('d-none');
              e.setAttribute('disabled', '');
              e.setAttribute('placeholder', 'Escriba nueva contraseña');
              eOpcional.setAttribute(
                'placeholder',
                'Escriba su contraseña original'
              );
              eOpcional.value = '';
              e.value = '';
              error.classList.remove('d-none');
              this.listens.push(
                this.render.listen('window', 'none', () => {
                  error.classList.add('d-none');
                })
              );
              this.cambios.detectChanges();
            }
          )
      );
    } else {
      cambiar.classList.remove('d-none');
      cancelar.classList.add('d-none');
      guardar.classList.add('d-none');
      e.setAttribute('disabled', '');
      e.setAttribute('placeholder', e.value);
      e.value = '';
    }

    this.cambios.detectChanges();
  }

  asignar(e: HTMLInputElement, nombre: string) {
    switch (nombre) {
      case 'nombre':
        this.nombre = e.placeholder;
        break;

      case 'contrasena':
        this.contrasena = e.placeholder;
        break;

      case 'estado':
        this.estado = e.placeholder;
        break;

      case 'notificaciones':
        this.notificaciones = e.placeholder;
        break;

      case 'privacidad':
        this.privacidad = e.placeholder;
        break;
    }
    this.cambios.detectChanges();
  }

  obtenerPlaceholder(nombre: string) {
    switch (nombre) {
      case 'nombre':
        return this.nombre;

      case 'contrasena':
        return this.contrasena;

      case 'estado':
        return this.estado;

      case 'notificaciones':
        return this.notificaciones;

      case 'privacidad':
        return this.privacidad;
    }
    this.cambios.detectChanges();
  }
}
