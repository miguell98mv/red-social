import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectAmigoService } from '../../../core/services/select-amigo/select-amigo.service';

@Component({
  selector: 'app-amigo-activo',
  templateUrl: './amigo-activo.component.html',
  styleUrls: ['./amigo-activo.component.scss'],
})
export class AmigoActivoComponent implements OnInit {
  @Output() myClick: EventEmitter<any> = new EventEmitter();
  nombre = 'Miguel Valero';

  constructor(public selectAmigo: SelectAmigoService) {}

  ngOnInit(): void {}

  eventClick() {
    this.myClick.emit(this.nombre);
    this.selectAmigo.displayNone = true;
  }
}
