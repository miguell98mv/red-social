import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { PeticionesService } from '../../../core/services/peticiones/peticiones.service';

@Component({
  selector: 'app-amigos-encontrados',
  templateUrl: './amigos-encontrados.component.html',
  styleUrls: ['./amigos-encontrados.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmigosEncontradosComponent implements OnInit {
  @Input('persona') persona: any;
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  assets: string = 'https://bucket-80hwyd.s3.amazonaws.com/';
  imagen: string = null;
  isAmigo: any;
  url: string;
  nameUser: string;
  subs: Subscription[] = [];

  constructor(
    private peticion: PeticionesService,
    private cambios: ChangeDetectorRef,
    private usuario: UsuarioService
  ) {}

  ngOnInit(): void {
    this.url =
      this.persona.id === this.usuario.datos.id
        ? `/perfil`
        : `/person/${this.persona.id}`;

    this.peticion.isAmigo(this.persona.id).subscribe((data: any[]) => {
      if (data.length) {
        if (data[0].amistad === 1) {
          this.isAmigo = 2;
        }
        if (data[0].amistad === 0) {
          this.isAmigo = 1;
        }
      } else {
        this.isAmigo = 0;
      }
      this.cambios.detectChanges();
    });

    this.subs.push(
      this.peticion.getPersonUser(this.persona.id).subscribe((datos: any) => {
        this.nameUser = datos.nameUser;
        if (datos.imagen) {
          this.imagen = datos.imagen;
          this.spanImagen.nativeElement.src = this.assets + this.imagen;
          this.spanImagen.nativeElement.classList.remove('d-none');
        }
        this.cambios.detectChanges();
      })
    );
  }

  addAmigo() {
    this.peticion.addAmigo(this.persona.id).subscribe((data) => {
      this.isAmigo = 1;
      this.cambios.detectChanges();
    });
  }

  removeAmigo() {
    this.peticion.removeAmigo(this.persona.id).subscribe((data) => {
      this.isAmigo = 0;
      this.cambios.detectChanges();
    });
  }
}
