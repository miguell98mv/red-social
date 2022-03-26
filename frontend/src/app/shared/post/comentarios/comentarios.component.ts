import { Observable, Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PeticionesService } from 'src/app/core/services/peticiones/peticiones.service';
('../../../core/services/peticiones/peticiones.service');
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComentariosComponent implements OnInit, OnDestroy {
  @Input('post') post: any;
  comentario: FormControl = new FormControl('');
  getComentarios: any;
  constructor(
    private peticiones: PeticionesService,
    private cambios: ChangeDetectorRef
  ) {}
  activeComentario = true;
  favorite = false;
  myLike: number;
  numberLike: number;
  subs: Subscription[] = [];

  ngOnInit(): void {
    const socket = io(environment.socket);

    socket.on('connect', () => {
      // console.log(`connection ${socket.id}`);
    });

    socket.on(`${this.post.id}-comentario`, (data) => {
      this.getComentarios = data;
      this.cambios.detectChanges();
    });

    socket.on(`${this.post.id}-likes`, (data) => {
      this.numberLike = data;
      this.cambios.detectChanges();
    });

    this.subs.push(
      this.peticiones.getComentarios(this.post.id).subscribe((data) => {
        this.getComentarios = data;
        this.cambios.detectChanges();
      })
    );

    this.subs.push(
      this.peticiones.getLikes(this.post.id).subscribe(
        (data: number) => {
          this.numberLike = data;
          this.cambios.detectChanges();
        },
        (error) => {
          console.log(error);
          this.cambios.detectChanges();
        }
      )
    );

    this.subs.push(
      this.peticiones.myLike(this.post.id).subscribe(
        (data: []) => {
          this.myLike = data.length;
          this.cambios.detectChanges();
        },
        (error) => {
          console.log(error);
          this.cambios.detectChanges();
        }
      )
    );
  }

  addComentario(input: HTMLInputElement) {
    input.value = '';
    this.subs.push(
      this.peticiones
        .addComentario({
          idPost: this.post.id,
          idUser: this.post.idUser,
          texto: this.comentario.value,
        })
        .subscribe(
          (data) => {
            this.cambios.detectChanges();
          },
          (error) => {
            console.log(error);
          }
        )
    );
  }

  addLike() {
    this.subs.push(
      this.peticiones
        .addLike({ idPost: this.post.id, idAmigo: this.post.idUser })
        .subscribe(
          (data: []) => {
            this.myLike = data.length;
            this.cambios.detectChanges();
          },
          (error) => {
            console.log(error);
            this.cambios.detectChanges();
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.subs?.forEach((e) => {
      e.unsubscribe();
    });
  }
}
