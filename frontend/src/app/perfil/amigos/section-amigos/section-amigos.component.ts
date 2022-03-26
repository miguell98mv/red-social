import { Subscription } from 'rxjs';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-section-amigos',
  templateUrl: './section-amigos.component.html',
  styleUrls: ['./section-amigos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionAmigosComponent implements OnInit, OnDestroy {
  @Input('amigo') amigo: any[any];
  subs: Subscription[] = [];
  nombre: string;
  @ViewChild('spanImagen') spanImagen: ElementRef<HTMLImageElement>;
  assets: string = 'https://bucket-80hwyd.s3.amazonaws.com/';
  imagen: string = null;

  constructor(
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.peticiones
        .getPersonUser(this.amigo.idAmigo)
        .subscribe((datos: any) => {
          this.nombre = datos.nameUser;
          if (datos.imagen) {
            this.imagen = datos.imagen;
            this.spanImagen.nativeElement.src = this.assets + this.imagen;
            this.spanImagen.nativeElement.classList.remove('d-none');
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
