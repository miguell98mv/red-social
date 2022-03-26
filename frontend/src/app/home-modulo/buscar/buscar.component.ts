import { Observable, Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from '../../core/services/peticiones/peticiones.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuscarComponent implements OnInit, OnDestroy {
  personSearch: any;
  personasEncontradas: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {
    this.route.params.subscribe((params) => {
      this.personSearch = params['persona'];
      this.personasEncontradas = this.peticiones.search(params['persona']);
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.personasEncontradas = this.peticiones.search(this.personSearch);
      this.cambios.detectChanges();
    });
  }

  ngOnDestroy(): void {}
}
