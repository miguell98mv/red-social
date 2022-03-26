import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectAmigoService } from '../../core/services/select-amigo/select-amigo.service';
import { PeticionesService } from '../../core/services/peticiones/peticiones.service';
import { UsuarioService } from '../../core/services/usuario/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('divSolicitudes') divSolicitudes: ElementRef<HTMLElement>;
  @ViewChild('divNotificaciones') divNotificaciones: ElementRef<HTMLElement>;
  @ViewChild('divMensajes') divMensajes: ElementRef<HTMLElement>;
  @ViewChildren('divPerfil') divPerfil: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('botonSolicitudes') botonSolicitudes: ElementRef<HTMLElement>;
  @ViewChild('botonMensajes') botonMensajes: ElementRef<HTMLElement>;
  @ViewChild('botonNotificaciones')
  botonNotificaciones: ElementRef<HTMLElement>;
  @ViewChildren('botonPefil') botonPefil: QueryList<ElementRef<HTMLElement>>;

  busqueda = new FormControl('');
  link = '/search/';
  buscar = '';
  url: string;
  subs: Subscription[] = [];
  element: HTMLElement;
  chatAmigos: any;
  newMensaje: any;
  numMensaje: number;
  mySolicitudes: any;
  myNotificaciones: any;
  numSolicitudes: number;
  newSolicitud: any;
  newNotificaciones: any;
  @ViewChildren('spanImagen') spanImagen: QueryList<
    ElementRef<HTMLImageElement>
  >;
  assets: string = 'https://bucket-80hwyd.s3.amazonaws.com/';
  imagen: string = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private render: Renderer2,
    public selectAmigo: SelectAmigoService,
    public peticionesService: PeticionesService,
    public usuario: UsuarioService,
    private cambios: ChangeDetectorRef,
    private peticiones: PeticionesService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.peticiones.getChatUser().subscribe((data: any) => {
        data.sort(function (a, b) {
          return b.fecha - a.fecha;
        });

        this.chatAmigos = data;
        this.numMensaje = data.length;
      })
    );

    this.subs.push(
      this.peticiones.newMensaje().subscribe((data: []) => {
        this.newMensaje = data;
      })
    );

    this.subs.push(
      this.peticiones.getSolicitudes().subscribe((data: []) => {
        this.mySolicitudes = data;
        this.numSolicitudes = data.length;
      })
    );

    this.subs.push(
      this.peticiones.newSolicitud().subscribe((data) => {
        this.newSolicitud = data[0];
      })
    );

    this.subs.push(
      this.peticiones.getNotificaciones().subscribe((data) => {
        this.myNotificaciones = data;
      })
    );

    this.subs.push(
      this.peticiones.newNotificacion().subscribe((data) => {
        this.newNotificaciones = data[0];
      })
    );

    this.route.url.subscribe((params) => {
      this.url = params[0]?.path;
    });

    this.subs.push(
      this.peticiones.getUser().subscribe((datos: any) => {
        if (datos.imagen) {
          this.imagen = datos.imagen;
          this.spanImagen?.forEach((e) => {
            e.nativeElement.classList.remove('d-none');
            e.nativeElement.src = this.assets + this.imagen;
          });
        }
        this.cambios.detectChanges();
      })
    );
  }

  ngAfterViewInit() {
    this.displayNone(
      this.divMensajes.nativeElement,
      this.botonMensajes.nativeElement
    );

    this.displayNone(
      this.divNotificaciones.nativeElement,
      this.botonNotificaciones.nativeElement
    );

    this.displayNone(
      this.divSolicitudes.nativeElement,
      this.botonSolicitudes.nativeElement
    );

    this.displayNone(
      this.divPerfil.first.nativeElement,
      this.botonPefil.first.nativeElement
    );

    this.displayNone(
      this.divPerfil.last.nativeElement,
      this.botonPefil.last.nativeElement
    );

    this.sockets();
  }

  ngOnDestroy() {
    document.removeAllListeners();
    this.botonNotificaciones.nativeElement.removeAllListeners();
    this.botonSolicitudes.nativeElement.removeAllListeners();
    this.botonMensajes.nativeElement.removeAllListeners();
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
  }

  buscarAmigo(input: HTMLInputElement) {
    if (input.value) {
      this.buscar = this.link + this.busqueda.value;
      input.value = '';
      this.router.navigate([this.buscar]);
      this.cambios.detectChanges();
    }
  }

  displayNone(div: HTMLElement, boton: HTMLElement) {
    boton.addEventListener('click', (e: any) => {
      document.querySelectorAll('.divMenu').forEach((element) => {
        if (!div.contains(element)) element.classList.add('d-none');
      });

      e.stopPropagation();
      this.selectAmigo.fideElement(div);
      this.render.setStyle(div, 'left', `${boton.offsetLeft}px`);

      window.addEventListener('resize', () => {
        this.render.setStyle(div, 'left', `${boton.offsetLeft}px`);
      });
    });

    this.render.listen('document', 'click', (e: any) => {
      this.selectAmigo.fideOut(div);
    });
  }

  divNone(element: HTMLElement) {
    this.selectAmigo.fideElement(element);
  }

  mensajesAmigo() {
    this.selectAmigo.displayNone = true;
  }

  cerrarSession() {
    this.subs.push(
      this.peticionesService.cerrarSession().subscribe(
        () => {
          this.router.navigate(['/session']);
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  notNewMensaje(link = false) {
    if (link) {
      this.subs?.forEach((s) => {
        s.unsubscribe();
      });
      this.router.navigate(['/mensajes']);
    }
    this.subs.push(
      this.peticiones.notNewMensaje().subscribe(() => {
        this.newMensaje.mensaje = false;
      })
    );
  }

  noNewSolicitud(link = false) {
    if (link) {
      this.subs?.forEach((s) => {
        s.unsubscribe();
      });
      this.router.navigate(['/solicitudes']);
    }

    if (this.newSolicitud) {
      this.subs.push(
        this.peticiones.noNewSolicitud().subscribe(() => {
          this.newSolicitud.solicitud = false;
        })
      );
    }
  }

  noNewNotificacion(link = false) {
    if (link) {
      this.subs?.forEach((s) => {
        s.unsubscribe();
      });
      this.router.navigate(['/notificaciones']);
    }

    this.subs.push(
      this.peticiones.noNewNotificacion().subscribe(() => {
        this.newNotificaciones.likes = false;
        this.newNotificaciones.comentario = false;
      })
    );
  }

  chatResponsive() {
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
    this.router.navigate(['/amigos-activos']);
  }

  sockets() {
    this.peticiones.getUser().subscribe((data: any) => {
      const socket = io(environment.socket);
      socket.on('connect', () => {});
      socket.on(`${data.id}-chatMensajes`, (data: any[]) => {
        this.subs.push(
          this.peticiones.getChatUser().subscribe((data: any) => {
            data.sort(function (a, b) {
              return b.fecha - a.fecha;
            });

            this.chatAmigos = data;
            this.numMensaje = data.length;
          })
        );

        this.subs.push(
          this.peticiones.newMensaje().subscribe((data: []) => {
            this.newMensaje = data;
          })
        );
      });

      socket.on(`${data.id}-solicitudes`, () => {
        this.subs.push(
          this.peticiones.getSolicitudes().subscribe((data: []) => {
            this.mySolicitudes = data;
            this.numSolicitudes = data.length;
          })
        );

        this.subs.push(
          this.peticiones.newSolicitud().subscribe((data) => {
            this.newSolicitud = data[0];
          })
        );
      });

      socket.on(`${data.id}-myNotificaciones`, () => {
        this.subs.push(
          this.peticiones.getNotificaciones().subscribe((data) => {
            this.myNotificaciones = data;
          })
        );

        this.subs.push(
          this.peticiones.newNotificacion().subscribe((data) => {
            this.newNotificaciones = data[0];
          })
        );
      });
    });
  }
}
