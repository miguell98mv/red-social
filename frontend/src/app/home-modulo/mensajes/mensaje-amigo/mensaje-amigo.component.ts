import { io, Socket } from 'socket.io-client';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { SelectAmigoService } from '../../../core/services/select-amigo/select-amigo.service';
import { PeticionesService } from '../../../core/services/peticiones/peticiones.service';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mensaje-amigo',
  templateUrl: './mensaje-amigo.component.html',
  styleUrls: ['./mensaje-amigo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensajeAmigoComponent implements OnInit {
  nombre: string;
  isActivo: Observable<any>;
  @Input('chatAmigo') chatAmigo: any;
  @Output('mySelectAmigo') mySelectAmigo = new EventEmitter();
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  assets: string = 'https://bucket-80hwyd.s3.amazonaws.com/';
  imagenPost: string;
  imagen: string = null;
  subs: Subscription[] = [];

  constructor(
    public selectAmigo: SelectAmigoService,
    public peticiones: PeticionesService,
    private usuario: UsuarioService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const socket = io(environment.socket);
    socket.on('connect', () => {});

    socket.on(`${this.usuario.datos?.id}-amigosActivos`, (data: []) => {
      this.isActivo = this.peticiones.isActivo(this.chatAmigo.chat);
    });

    socket.on(`${this.usuario.datos?.id}-visto`, (data: []) => {
      this.chatAmigo.visto = 0;
      this.cambios.detectChanges();
    });

    this.isActivo = this.peticiones.isActivo(this.chatAmigo.chat);

    this.subs.push(
      this.peticiones
        .getPersonUser(this.chatAmigo.chat)
        .subscribe((datos: any) => {
          this.nombre = datos.nameUser;
          if (datos.imagen) {
            this.imagen = datos.imagen;
            this.spanImagen.nativeElement.src = this.assets + this.imagen;
            this.spanImagen.nativeElement.classList.remove('d-none');
          }
          this.cambios.detectChanges();
        })
    );
  }

  showDivAllMensajes() {
    this.selectAmigo.divAllMensajes();
  }

  clickSelectAmigo() {
    this.peticiones.visto(this.chatAmigo.chat).subscribe(() => {});
    this.mySelectAmigo.emit(this.chatAmigo);
    this.cambios.detectChanges();
  }
}
