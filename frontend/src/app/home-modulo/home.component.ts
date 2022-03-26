import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectAmigoService } from '../core/services/select-amigo/select-amigo.service';
import { PeticionesService } from '../core/services/peticiones/peticiones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  url: string;
  tamano: string;
  postHome: Array<any>;
  numberPost: number;
  interval: any;
  escuchando: any;
  subs: Subscription[] = [];
  loadRequest: boolean = false;
  pagePost: number = 0;

  constructor(
    private route: ActivatedRoute,
    public selectAmigo: SelectAmigoService,
    private peticiones: PeticionesService,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.selectAmigo.displayAllMensajes = false;
    this.route.url.subscribe((data) => {
      this.url = data[0].path;

      if (this.url === 'home') {
        this.subs.push(
          this.peticiones
            .getPostHome({ page: this.pagePost })
            .subscribe((data: []) => {
              this.postHome = data;
              this.numberPost = data.length;
              this.loadRequest = true;
            })
        );
      }
    });
  }

  ngAfterViewInit() {
    document
      .querySelectorAll('.alturaPantalla')
      .forEach((element: HTMLElement) => {
        element.style.height = window.innerHeight - 84 + 'px';
        this.tamano = window.innerHeight - 110 + 'px';

        window.addEventListener('resize', () => {
          element.style.height = window.innerHeight - 84 + 'px';
          this.tamano = window.innerHeight - 110 + 'px';
        });
      });
    document
      .querySelectorAll('.alturaPantallaSolicitudes')
      .forEach((element: HTMLElement) => {
        element.style.height = window.innerHeight - 108 + 'px';

        window.addEventListener('resize', () => {
          element.style.height = window.innerHeight - 108 + 'px';
        });
      });

    this.interval = setTimeout(() => {
      if (document.getElementById('divChat')) {
        document.getElementById('divChat').style.height =
          window.innerHeight - 100 + 'px';

        this.escuchando = this.render.listen('window', 'resize', () => {
          document.getElementById('divChat').style.height =
            window.innerHeight - 100 + 'px';
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subs?.forEach((s) => {
      s.unsubscribe();
    });
    this.escuchando ? this.escuchando() : false;
    clearInterval(this.interval);
  }

  log(element) {
    console.log(element);
  }

  onScroll() {
    if (this.loadRequest) {
      console.log('scroll');
      this.pagePost = this.pagePost + 1;
      this.loadRequest = false;
      this.subs.push(
        this.peticiones
          .getPostHome({ page: this.pagePost })
          .subscribe((data: any) => {
            this.postHome = this.postHome.concat(data);
            console.log(this.postHome);
            this.loadRequest = true;
          })
      );
    }
  }
}
