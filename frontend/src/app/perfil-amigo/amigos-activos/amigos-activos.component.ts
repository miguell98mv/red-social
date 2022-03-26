import { Component, OnInit } from '@angular/core';
import { SelectAmigoService } from '../../core/services/select-amigo/select-amigo.service';

@Component({
  selector: 'app-amigos-activos',
  templateUrl: './amigos-activos.component.html',
  styleUrls: ['./amigos-activos.component.scss'],
})
export class AmigosActivosComponent implements OnInit {
  constructor(private selectAmigo: SelectAmigoService) {}

  ngOnInit(): void {}

  log(nombre: any) {
    console.log(nombre);
  }
}
