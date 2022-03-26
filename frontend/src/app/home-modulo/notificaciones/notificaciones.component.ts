import { Subscription } from 'rxjs';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  notificaciones: any;
  numNotificaciones: number = 1;
  constructor(
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.peticiones.getNotificaciones().subscribe((data: []) => {
        this.notificaciones = data;
        this.numNotificaciones = data?.length;
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
