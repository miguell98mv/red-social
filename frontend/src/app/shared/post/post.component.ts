import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PeticionesService } from '../../core/services/peticiones/peticiones.service';
import { UsuarioService } from '../../core/services/usuario/usuario.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit, OnDestroy {
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  @Input('post') post: any;
  nameUser: string;
  url: string;
  assets: string = 'https://bucket-80hwyd.s3.amazonaws.com/';
  imagenPost: string;
  imagen: string = null;
  subs: Subscription[] = [];

  constructor(
    public usuario: UsuarioService,
    private cambios: ChangeDetectorRef,
    private peticion: PeticionesService
  ) {}

  ngOnInit(): void {
    if (this.post.imagen) {
      this.imagenPost = this.assets + this.post.imagen;
    }
    this.url =
      this.post.idUser === this.usuario.datos?.id
        ? '/perfil'
        : `/person/${this.post.idUser}`;

    this.subs.push(
      this.peticion.getPersonUser(this.post.idUser).subscribe((datos: any) => {
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

  ngOnDestroy(): void {
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
  }

  log(data) {
    console.log(data);
    this.cambios.detectChanges();
  }
}
