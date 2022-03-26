import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SelectAmigoService } from '../../core/services/select-amigo/select-amigo.service';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmigosComponent implements OnInit {
  amigos: any[];

  constructor(
    public selectAmigo: SelectAmigoService,
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.peticiones.getAmigos().subscribe((data: []) => {
      this.amigos = data;
      this.cambios.detectChanges();
    });
  }
}
