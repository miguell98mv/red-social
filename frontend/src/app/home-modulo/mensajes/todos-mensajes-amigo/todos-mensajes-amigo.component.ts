import { Observable } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SelectAmigoService } from '../../../core/services/select-amigo/select-amigo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todos-mensajes-amigo',
  templateUrl: './todos-mensajes-amigo.component.html',
  styleUrls: ['./todos-mensajes-amigo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosMensajesAmigoComponent implements OnInit {
  params: string;
  mensajes: Observable<any>;

  constructor(
    public selectAmigo: SelectAmigoService,
    private route: ActivatedRoute,
    private router: Router,
    private cambios: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route?.children[0]?.params?.subscribe((params) => {
      this.params = params.idAmigo;
      this.cambios.detectChanges();
    });

    this.router.events.subscribe(() => {
      if (this.route.children.length) {
        this.route.children[0].params.subscribe((params) => {
          this.params = params.idAmigo;
          this.cambios.detectChanges();
        });
      } else {
        this.params = '';
      }
      this.cambios.detectChanges();
    });
  }
}
