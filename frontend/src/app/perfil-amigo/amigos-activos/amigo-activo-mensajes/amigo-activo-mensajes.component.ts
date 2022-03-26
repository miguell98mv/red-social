import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { SelectAmigoService } from '../../../core/services/select-amigo/select-amigo.service';

@Component({
  selector: 'app-amigo-activo-mensajes',
  templateUrl: './amigo-activo-mensajes.component.html',
  styleUrls: ['./amigo-activo-mensajes.component.scss'],
})
export class AmigoActivoMensajesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('ultimoAmigos') ultimoAmigos: ElementRef<HTMLElement>;
  @ViewChild('amigoActivo') amigoActivo: ElementRef<HTMLElement>;
  @Output() myClick: EventEmitter<any> = new EventEmitter();

  nombre = 'Miguel Valero';

  constructor(public selectAmigo: SelectAmigoService) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.selectAmigo.fideIn(this.amigoActivo.nativeElement);

    this.ultimoAmigos.nativeElement.scrollIntoView();
    window.onload = () => {
      this.ultimoAmigos.nativeElement.scrollIntoView();
    };
  }

  ngOnDestroy(): void {
    this.selectAmigo.displayNone = false;
  }
  eventClick() {
    this.myClick.emit(this.nombre);
    this.selectAmigo.fideOut(this.amigoActivo.nativeElement);
    setTimeout(() => {
      this.selectAmigo.displayNone = false;
    }, 100);
  }
}
