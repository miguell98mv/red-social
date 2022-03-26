import { PeticionesService } from './../../../core/services/peticiones/peticiones.service';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-section-solicitud',
  templateUrl: './section-solicitud.component.html',
  styleUrls: ['./section-solicitud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionSolicitudComponent implements OnInit, OnDestroy {
  @Input('solicitud') solicitud: any;
  nameUser: string;
  subs: Subscription[] = [];
  aceptar: boolean = false;
  cancelar: boolean = false;

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
