import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import { Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificacionComponent implements OnInit, OnDestroy {
  @Input('notificacion') notificacion: any;
  nameUser: any;
  subs: Subscription[] = [];
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  assets: string = 'https://bucket-80hwyd.s3.us-east-1.amazonaws.com/';
  imagen = null;

  constructor(
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.peticiones.getNameUser(this.notificacion.idAmigo).subscribe((data) => {
      this.nameUser = data[0].nameUser;
      this.cambios.detectChanges();
    });

    this.subs.push(
      this.peticiones
        .getPersonUser(this.notificacion.idAmigo)
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
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
  }
}
