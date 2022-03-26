import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { SelectAmigoService } from '../../../core/services/select-amigo/select-amigo.service';

@Component({
  selector: 'app-amigo-activo',
  templateUrl: './amigo-activo.component.html',
  styleUrls: ['./amigo-activo.component.scss'],
})
export class AmigoActivoComponent implements OnInit, OnDestroy {
  @Output() myClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  @Input('amigoActivo') amigoActivo: any;
  assets: string = 'https://bucket-80hwyd.s3.amazonaws.com/';
  imagenPost: string;
  imagen: string = null;
  subs: Subscription[] = [];

  constructor(
    public selectAmigo: SelectAmigoService,
    private peticion: PeticionesService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.peticion
        .getPersonUser(this.amigoActivo.id)
        .subscribe((datos: any) => {
          this.amigoActivo.nameUser = datos.nameUser;
          if (datos.imagen) {
            this.imagen = datos.imagen;
            this.spanImagen.nativeElement.classList.remove('d-none');
            this.spanImagen.nativeElement.src = this.assets + this.imagen;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
  }

  eventClick() {
    this.myClick.emit(this.amigoActivo.id);
    this.selectAmigo.displayNone = true;
  }
}
