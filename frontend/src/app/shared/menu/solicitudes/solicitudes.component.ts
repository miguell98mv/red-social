import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolicitudesComponent implements OnInit {
  @Input('solicitud') solicitud: any;
  nameUser: string;
  subs: Subscription[] = [];
  aceptar: boolean = false;
  cancelar: boolean = false;
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  assets: string = 'https://bucket-80hwyd.s3.us-east-1.amazonaws.com/';
  imagen = null;

  constructor(
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.peticiones.getNameUser(this.solicitud.idAmigo).subscribe((data) => {
        this.nameUser = data[0].nameUser;
        this.cambios.detectChanges();
      })
    );

    this.subs.push(
      this.peticiones
        .getPersonUser(this.solicitud.idAmigo)
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

  ngOnDestroy(): void {
    this.subs.forEach((e) => {
      e.unsubscribe();
    });
  }

  aceptarPeticion() {
    let data = { idAmigo: this.solicitud.idAmigo };
    this.subs.push(
      this.peticiones.aceptarSolicitud(data).subscribe((data) => {
        this.aceptar = true;
        this.cambios.detectChanges();
      })
    );
  }

  cancelarPeticion() {
    this.subs.push(
      this.peticiones
        .removeAmigoUser(this.solicitud.idAmigo)
        .subscribe((data) => {
          this.cancelar = true;
          this.cambios.detectChanges();
        })
    );
  }
}
