import { UsuarioService } from './../../../core/services/usuario/usuario.service';
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
  selector: 'app-section-amigos',
  templateUrl: './section-amigos.component.html',
  styleUrls: ['./section-amigos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionAmigosComponent implements OnInit {
  @Input('amigo') amigo: any;
  subs: Subscription[] = [];
  nombre: string;
  url: string;

  constructor(
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef,
    private usuario: UsuarioService
  ) {}

  ngOnInit(): void {
    this.url =
      this.amigo.idAmigo === this.usuario.datos?.id
        ? '/perfil'
        : `/person/${this.amigo.idAmigo}`;

    this.subs.push(
      this.peticiones.getNameUser(this.amigo.idAmigo).subscribe((data) => {
        this.nombre = data[0].nameUser;
        this.cambios.detectChanges();
      })
    );
  }
}
