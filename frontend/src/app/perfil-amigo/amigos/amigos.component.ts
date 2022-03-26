import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
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
  @Input('id') id: string;
  amigos: any;

  constructor(
    public selectAmigo: SelectAmigoService,
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.peticiones.getAmigosUser(this.id).subscribe((data) => {
      this.amigos = data;
      this.cambios.detectChanges();
    });
  }
}
