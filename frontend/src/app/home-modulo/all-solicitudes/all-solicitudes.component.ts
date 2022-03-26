import { Subscription } from 'rxjs';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { SelectAmigoService } from '../../core/services/select-amigo/select-amigo.service';

@Component({
  selector: 'app-all-solicitudes',
  templateUrl: './all-solicitudes.component.html',
  styleUrls: ['./all-solicitudes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllSolicitudesComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  solicitudes: any;
  numSolicitudes: number = 1;
  constructor(
    public selectAmigo: SelectAmigoService,
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.peticiones.getSolicitudes().subscribe((data: []) => {
        this.solicitudes = data;
        this.numSolicitudes = data.length;
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
