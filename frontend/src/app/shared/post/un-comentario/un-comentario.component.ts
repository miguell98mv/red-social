import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-un-comentario',
  templateUrl: './un-comentario.component.html',
  styleUrls: ['./un-comentario.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnComentarioComponent implements OnInit {
  @Input('comentario') comentario: any;
  nameUser: Observable<any>;
  constructor(
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.nameUser = this.peticiones.getNameUser(this.comentario.idAmigo).pipe(
      finalize(() => {
        this.cambios.detectChanges();
      })
    );
  }

  log(data) {
    console.log(data);
    this.cambios.detectChanges();
  }
}
