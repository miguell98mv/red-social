import { UsuarioService } from './../core/services/usuario/usuario.service';
import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { SelectAmigoService } from '../core/services/select-amigo/select-amigo.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('texto') texto: ElementRef<HTMLElement>;
  @ViewChild('archivo') archivo: ElementRef<HTMLInputElement>;

  url;
  posts: any;
  subs: Subscription[] = [];
  imagenHTML: HTMLImageElement;
  postElse: boolean = false;
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  assets: string = 'https://bucket-80hwyd.s3.amazonaws.com/';
  imagen: string = null;
  nameUser: string;
  @ViewChild('Inputimagen') Inputimagen: ElementRef<HTMLInputElement>;

  constructor(
    public selectAmigo: SelectAmigoService,
    public route: ActivatedRoute,
    private peticiones: PeticionesService,
    private usuario: UsuarioService,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    const socket = io(environment.socket);

    socket.on(`${this.usuario.datos?.id}-myPost`, () => {
      if (!this.url) {
        this.subs.push(
          this.peticiones.myPosts().subscribe((data) => {
            this.posts = data;
          })
        );
      }
    });

    this.route.url.subscribe((data) => {
      if (data.length) this.url = data[0].path;

      if (!this.url) {
        this.subs.push(
          this.peticiones.myPosts().subscribe((data) => {
            this.posts = data;
          })
        );
      }
    });

    this.subs.push(
      this.peticiones.getUser().subscribe((datos: any) => {
        this.nameUser = datos.nameUser;
        if (datos.imagen) {
          this.imagen = datos.imagen;
          this.spanImagen.nativeElement.src = this.assets + this.imagen;
          this.spanImagen.nativeElement.classList.remove('d-none');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngAfterViewInit() {
    document
      .querySelectorAll('.alturaPantalla')
      .forEach((element: HTMLElement) => {
        if (window.innerWidth <= 900) {
          element.style.height = window.innerHeight - 260 + 'px';
        } else if (window.innerWidth <= 600) {
          element.style.height = window.innerHeight - 300 + 'px';
        } else {
          element.style.height = window.innerHeight - 146 + 'px';
        }

        window.addEventListener('resize', () => {
          if (window.innerWidth <= 900) {
            element.style.height = window.innerHeight - 260 + 'px';
          } else if (window.innerWidth <= 600) {
            element.style.height = window.innerHeight - 146 + 'px';
          } else {
            element.style.height = window.innerHeight - 146 + 'px';
          }
        });
      });

    if (document.getElementById('divChat')) {
      setTimeout(() => {
        document.getElementById('divChat').style.height =
          window.innerHeight - 100 + 'px';

        window.addEventListener('resize', () => {
          document.getElementById('divChat').style.height =
            window.innerHeight - 100 + 'px';
        });
      });
    }

    if (document.getElementById('selectArchivo')) {
      document.getElementById('selectArchivo').addEventListener(
        'change',
        (e: any) => {
          let archivo = e.target.files;
          if (!archivo || !archivo.length) return;
          let ext = archivo[0].type.split('/')[1];
          let extValid = /jpg|jpeg|png/;
          if (!extValid.test(ext)) return;

          let imagen = document.createElement('img');
          imagen.src = URL.createObjectURL(archivo[0]);
          imagen.style.width = '100%';
          imagen.style.display = 'flex';
          imagen.style.marginBottom = '1rem';
          imagen.setAttribute('id', 'imagen');
          if (window.innerWidth > 600) {
            imagen.style.borderRadius = '5px';
          } else {
            imagen.style.borderRadius = '0px';
          }
          this.imagenHTML = imagen;
          document.getElementById('imagen').replaceWith(imagen);
        },
        false
      );
    }

    window.addEventListener('resize', () => {
      if (document.getElementById('imagen')) {
        if (window.innerWidth > 600) {
          document.getElementById('imagen').style.borderRadius = '5px';
        } else {
          document.getElementById('imagen').style.borderRadius = '0px';
        }
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
        this.peticiones.addImagen(archivo[0]).subscribe(() => {
          this.imagen = imagen.src;
          this.spanImagen.nativeElement.classList.remove('d-none');
          this.spanImagen.nativeElement.src = this.imagen;
        })
      );
    });
  }

  log(e) {
    console.log(e);
  }

  clickArchivo(e: HTMLElement) {
    e.click();
  }

  sendFile() {
    this.postElse = true;
    let data = {
      texto: this.texto.nativeElement.textContent,
      archivo: this.archivo.nativeElement.files[0],
    };

    this.peticiones.addPost(data).subscribe((data) => {
      this.texto.nativeElement.textContent = '';
      this.archivo.nativeElement.value = '';
      this.imagenHTML.src = '';
      window.scroll({ top: 0 });
      this.postElse = false;
    });
  }
}
