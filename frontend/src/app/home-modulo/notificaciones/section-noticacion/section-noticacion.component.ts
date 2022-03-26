import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import { Subscription } from 'rxjs';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-section-noticacion',
  templateUrl: './section-noticacion.component.html',
  styleUrls: ['./section-noticacion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionNoticacionComponent implements OnInit, OnDestroy {
  @Input('notificacion') notificacion: any;
  nameUser: string;
  subs: Subscription[] = [];
  url: string;
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  assets: string = 'https://bucket-80hwyd.s3.amazonaws.com/';
  imagen: string = null;

  constructor(
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef,
    private usuario: UsuarioService
  ) {}

  ngOnInit(): void {
    this.url =
      this.notificacion.idAmigo === this.usuario.datos.id
        ? `/perfil`
        : `/person/${this.notificacion.idAmigo}`;

    this.peticiones.getNameUser(this.notificacion.idAmigo).subscribe((data) => {
      this.nameUser = data[0].nameUser;
      this.cambios.detectChanges();
    });

    this.subs.push(
      this.peticiones
        .getPersonUser(this.notificacion.idAmigo)
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
  }

  ngOnDestroy(): void {
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
  }
}
