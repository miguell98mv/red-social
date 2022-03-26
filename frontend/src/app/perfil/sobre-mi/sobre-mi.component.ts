import { Subscription } from 'rxjs';
import { UsuarioService } from './../../core/services/usuario/usuario.service';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SobreMiComponent implements OnInit {
  ubicacion;
  musica;
  profesion;
  pasatiempo;
  telefono;
  subs: Subscription[] = [];
  constructor(
    private peticiones: PeticionesService,
    public usuario: UsuarioService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  log(e: HTMLElement) {
    console.log(e.contentEditable);
    console.log(e.textContent);
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
    this.cambios.detectChanges();
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
    metodo: string = ''
  ) {
    if (metodo === 'musica') {
      this.peticiones.generoMusical(e.value).subscribe(() => {
        this.usuario.datos.genero_musical = e.value;
        cambiar.classList.remove('d-none');
        cancelar.classList.add('d-none');
        guardar.classList.add('d-none');
        e.setAttribute('disabled', '');
        e.setAttribute('placeholder', e.value);
        e.value = '';
        this.cambios.detectChanges();
      });
    }

    if (metodo === 'profesion') {
      this.subs.push(
        this.peticiones.profesion(e.value).subscribe(() => {
          this.usuario.datos.profesion = e.value;
          cambiar.classList.remove('d-none');
          cancelar.classList.add('d-none');
          guardar.classList.add('d-none');
          e.setAttribute('disabled', '');
          e.setAttribute('placeholder', e.value);
          e.value = '';
          this.cambios.detectChanges();
        })
      );
    }

    if (metodo === 'que_te_gusta') {
      this.subs.push(
        this.peticiones.que_te_gusta(e.value).subscribe((data) => {
          console.log(data);
          this.usuario.datos.que_te_gusta = e.value;
          cambiar.classList.remove('d-none');
          cancelar.classList.add('d-none');
          guardar.classList.add('d-none');
          e.setAttribute('disabled', '');
          e.setAttribute('placeholder', e.value);
          e.value = '';
          this.cambios.detectChanges();
        })
      );
    }

    if (metodo === 'telefono') {
      this.subs.push(
        this.peticiones.telefono(e.value).subscribe(() => {
          this.usuario.datos.telefono = e.value;
          cambiar.classList.remove('d-none');
          cancelar.classList.add('d-none');
          guardar.classList.add('d-none');
          e.setAttribute('disabled', '');
          e.setAttribute('placeholder', e.value);
          e.value = '';
          this.cambios.detectChanges();
        })
      );
    }

    if (metodo === 'ubicacion') {
      this.subs.push(
        this.peticiones.ubicacion(e.value).subscribe(() => {
          this.usuario.datos.ubicacion = e.value;
          cambiar.classList.remove('d-none');
          cancelar.classList.add('d-none');
          guardar.classList.add('d-none');
          e.setAttribute('disabled', '');
          e.setAttribute('placeholder', e.value);
          e.value = '';
          this.cambios.detectChanges();
        })
      );
    }
  }

  asignar(e: HTMLInputElement, nombre: string) {
    switch (nombre) {
      case 'ubicacion':
        this.ubicacion = e.placeholder;
        break;

      case 'musica':
        this.musica = e.placeholder;
        break;

      case 'profesion':
        this.profesion = e.placeholder;
        break;

      case 'pasatiempos':
        this.pasatiempo = e.placeholder;
        break;

      case 'telefono':
        this.telefono = e.placeholder;
        break;
    }
    this.cambios.detectChanges();
  }

  obtenerPlaceholder(nombre: string) {
    switch (nombre) {
      case 'ubicacion':
        return this.ubicacion;

      case 'musica':
        return this.musica;

      case 'profesion':
        return this.profesion;

      case 'pasatiempos':
        return this.pasatiempo;

      case 'telefono':
        return this.telefono;
    }
    this.cambios.detectChanges();
  }
}
