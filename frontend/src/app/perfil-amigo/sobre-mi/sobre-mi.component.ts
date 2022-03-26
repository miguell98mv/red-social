import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SobreMiComponent implements OnInit {
  @Input('id') id: any;
  datos: any;
  subs: Subscription[] = [];

  constructor(
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.peticiones.getPersonUser(this.id).subscribe((data) => {
      this.datos = data;
      this.cambios.detectChanges();
    });
  }

  log(e: HTMLElement) {
    console.log(e.contentEditable);
    console.log(e.textContent);
  }
}
