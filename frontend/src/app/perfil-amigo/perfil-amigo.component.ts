import { PeticionesService } from './../core/services/peticiones/peticiones.service';
import { Subscription } from 'rxjs';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { SelectAmigoService } from '../core/services/select-amigo/select-amigo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-amigo',
  templateUrl: './perfil-amigo.component.html',
  styleUrls: ['./perfil-amigo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilAmigoComponent implements OnInit, AfterViewInit, OnDestroy {
  url;
  id: string;
  posts: any;
  subs: Subscription[] = [];
  events: any[] = [];
  usuario: any;

  constructor(
    public selectAmigo: SelectAmigoService,
    public route: ActivatedRoute,
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data.id;
      console.log(this.id);
      this.cambios.detectChanges();
    });

    this.peticiones.getPersonUser(this.id).subscribe((data) => {
      this.usuario = data;
    });

    this.route.url.subscribe((data) => {
      if (data.length) this.url = data[0].path;
      this.cambios.detectChanges();
    });

    this.subs.push(
      this.peticiones.userPosts(this.id).subscribe((data) => {
        this.posts = data;
        this.cambios.detectChanges();
      })
    );
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

        this.events.push(
          this.render.listen('window', 'resize', () => {
            if (window.innerWidth <= 900) {
              element.style.height = window.innerHeight - 260 + 'px';
            } else if (window.innerWidth <= 600) {
              element.style.height = window.innerHeight - 146 + 'px';
            } else {
              element.style.height = window.innerHeight - 146 + 'px';
            }
          })
        );
      });

    if (document.getElementById('divChat')) {
      setTimeout(() => {
        document.getElementById('divChat').style.height =
          window.innerHeight - 100 + 'px';

        this.events.push(
          this.render.listen('window', 'resize', () => {
            document.getElementById('divChat').style.height =
              window.innerHeight - 100 + 'px';
          })
        );
      });
    }

    if (document.getElementById('selectArchivo')) {
      document.getElementById('selectArchivo').addEventListener(
        'change',
        (e: any) => {
          let archivo = e.target.files;
          if (!archivo || !archivo.length) return;

          if (archivo[0].type !== 'image/jpeg') return;

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
          document.getElementById('imagen').replaceWith(imagen);
        },
        false
      );
    }

    this.events.push(
      this.render.listen('window', 'resize', () => {
        if (document.getElementById('imagen')) {
          if (window.innerWidth > 600) {
            document.getElementById('imagen').style.borderRadius = '5px';
          } else {
            document.getElementById('imagen').style.borderRadius = '0px';
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });

    this.events?.forEach((listen) => {
      listen();
    });
  }

  log(e) {
    console.log(e);
  }

  clickArchivo(e: HTMLElement) {
    e.click();
  }
}
