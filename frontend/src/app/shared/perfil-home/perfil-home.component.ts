import { Subscription } from 'rxjs';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { SelectAmigoService } from '../../core/services/select-amigo/select-amigo.service';
import { UsuarioService } from '../../core/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil-home',
  templateUrl: './perfil-home.component.html',
  styleUrls: ['./perfil-home.component.scss'],
})
export class PerfilHomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('Inputimagen') Inputimagen: ElementRef<HTMLInputElement>;
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  assets: string = 'https://bucket-80hwyd.s3.us-east-1.amazonaws.com/';
  subs: Subscription[] = [];
  imagen = null;
  url: string;
  tamano: string;
  postHome: Array<any>;
  numberPost: number;
  interval: any;
  escuchando: any;

  constructor(
    public selectAmigo: SelectAmigoService,
    private render: Renderer2,
    public usuario: UsuarioService,
    private peticion: PeticionesService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    document
      .querySelectorAll('.alturaPantalla')
      .forEach((element: HTMLElement) => {
        element.style.height = window.innerHeight - 84 + 'px';
        this.tamano = window.innerHeight - 110 + 'px';

        window.addEventListener('resize', () => {
          element.style.height = window.innerHeight - 84 + 'px';
          this.tamano = window.innerHeight - 110 + 'px';
        });
      });

    this.interval = setTimeout(() => {
      if (document.getElementById('divChat')) {
        document.getElementById('divChat').style.height =
          window.innerHeight - 100 + 'px';

        this.escuchando = this.render.listen('window', 'resize', () => {
          document.getElementById('divChat').style.height =
            window.innerHeight - 100 + 'px';
        });
      }
    });

    this.render.listen(this.Inputimagen.nativeElement, 'change', (e: any) => {
      let archivo = e.target.files;
      if (!archivo || !archivo.length) return;
      let ext = archivo[0].type.split('/')[1];
      let extValid = /jpg|jpeg|png/;
      if (!extValid.test(ext)) return;

      let imagen = document.createElement('img');
      imagen.src = URL.createObjectURL(archivo[0]);
      this.subs.push(
        this.peticion.addImagen(archivo[0]).subscribe(() => {
          this.imagen = imagen.src;
          this.spanImagen.nativeElement.classList.remove('d-none');
          this.spanImagen.nativeElement.src = this.imagen;
        })
      );
    });

    this.subs.push(
      this.peticion.getUser().subscribe((datos: any) => {
        if (datos.imagen) {
          this.imagen = datos.imagen;
          this.spanImagen.nativeElement.classList.remove('d-none');
          this.spanImagen.nativeElement.src = this.assets + this.imagen;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.escuchando ? this.escuchando() : false;
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
    clearInterval(this.interval);
  }

  log(element) {
    console.log(element);
  }
}
