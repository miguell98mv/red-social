import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-perfil-home-amigo',
  templateUrl: './perfil-home-amigo.component.html',
  styleUrls: ['./perfil-home-amigo.component.scss'],
})
export class PerfilHomeAmigoComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  id: string;
  usuario: any;

  constructor(
    public route: ActivatedRoute,
    private peticiones: PeticionesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });

    this.peticiones.getPersonUser(this.id).subscribe((data) => {
      this.usuario = data;
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {}
}
