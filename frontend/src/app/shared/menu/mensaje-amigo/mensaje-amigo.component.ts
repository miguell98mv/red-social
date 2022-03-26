import { environment } from './../../../../environments/environment';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import { Observable, Subscription } from 'rxjs';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { SelectAmigoService } from '../../../core/services/select-amigo/select-amigo.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-menu-mensaje-amigo',
  templateUrl: './mensaje-amigo.component.html',
  styleUrls: ['./mensaje-amigo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensajeAmigoComponent implements OnInit, OnDestroy, AfterViewInit {
  nameUser: Observable<any>;
  isActivo: Observable<any>;
  subs: Subscription[] = [];
  @Input('chatAmigo') chatAmigo: any;
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  assets: string = 'https://bucket-80hwyd.s3.us-east-1.amazonaws.com/';
  imagen = null;

  constructor(
    public selectAmigo: SelectAmigoService,
    private peticiones: PeticionesService,
    private usuario: UsuarioService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.nameUser = this.peticiones.getNameUser(this.chatAmigo.chat);
    this.isActivo = this.peticiones.isActivo(this.chatAmigo.chat);

    this.subs.push(
      this.peticiones
        .getPersonUser(this.chatAmigo.chat)
        .subscribe((datos: any) => {
          if (datos.imagen) {
            this.imagen = datos.imagen;
            this.spanImagen.nativeElement.classList.remove('d-none');
            this.spanImagen.nativeElement.src = this.assets + this.imagen;
            this.cambios.detectChanges();
          }
          this.cambios.detectChanges();
        })
    );
  }

  ngAfterViewInit(): void {
    this.sockets();
  }

  ngOnDestroy(): void {
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
  }

  showDivAllMensajes(idAmigo) {
    this.subs.push(
      this.peticiones.visto(this.chatAmigo.chat).subscribe(() => {})
    );
    this.selectAmigo.id = idAmigo;
    this.selectAmigo.divAllMensajes();
    this.cambios.detectChanges();
  }

  sockets() {
    this.peticiones.getUser().subscribe((data: any) => {
      const socket = io(environment.socket);
      socket.on('connect', () => {});

      socket.on(`${data.id}-amigosActivos`, (data: []) => {
        this.isActivo = this.peticiones.isActivo(this.chatAmigo.chat);
      });

      socket.on(`${data.id}-visto`, (data: []) => {
        this.chatAmigo.visto = 0;
        this.cambios.detectChanges();
      });
    });
  }
}
