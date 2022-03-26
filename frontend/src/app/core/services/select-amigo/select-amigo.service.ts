import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectAmigoService {
  id: string;
  displayNone: boolean = false;
  displayAllMensajes: boolean = false;
  constructor() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 600) {
        this.displayAllMensajes = false;
      }
    });
  }

  fideElement(element: HTMLElement) {
    if (!element.classList.contains('d-none')) {
      element.animate(
        {
          opacity: 0,
        },
        100
      ).onfinish = () => {
        element.classList.add('d-none');
      };
    } else {
      element.classList.remove('d-none');
      element.animate(
        [
          {
            opacity: 0,
          },
          {
            opacity: 100,
          },
        ],
        100
      );
    }
  }

  fideOut(element: HTMLElement) {
    element.animate(
      {
        opacity: 0,
      },
      100
    ).onfinish = () => {
      element.classList.add('d-none');
    };
  }

  fideIn(element: HTMLElement) {
    element.classList.remove('d-none');
    element.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 100,
        },
      ],
      100
    );
  }

  divAllMensajes() {
    if (window.innerWidth <= 600) {
      this.displayAllMensajes = true;
    }
  }

  divMensajes() {
    if (window.innerWidth <= 600) {
      this.displayAllMensajes = false;
    }
  }
}
