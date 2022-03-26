import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
  QueryList,
  ViewChild,
  Renderer2,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { PeticionesService } from '../core/services/peticiones/peticiones.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('tengoCuenta') tengoCuenta: QueryList<ElementRef>;
  @ViewChildren('errores') errores: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('formulario') formulario: QueryList<
    ElementRef<HTMLFormElement>
  >;
  @ViewChild('message') message: ElementRef<HTMLElement>;

  session: boolean = true;
  sessionUser: FormGroup;
  controls: any;
  iniciarSession: Subscription;

  constructor(
    private peticion: PeticionesService,
    private fb: FormBuilder,
    private render: Renderer2,
    private router: Router,
    private cambios: ChangeDetectorRef,
    private peticiones: PeticionesService,
    private usuario: UsuarioService
  ) {}

  ngOnInit(): void {
    this.sessionUser = this.fb.group({
      nameUser: ['', [Validators.required, Validators.maxLength(16)]],
      nombre: ['', [Validators.required, Validators.maxLength(16)]],
      apellido: ['', [Validators.required, Validators.maxLength(16)]],
      email: [
        '',
        [Validators.required, Validators.maxLength(30), Validators.email],
      ],
      password: ['', [Validators.required, Validators.maxLength(60)]],
    });

    this.controls = this.sessionUser.controls;
  }

  ngAfterViewInit() {
    this.tengoCuenta.forEach((e: ElementRef<HTMLElement>) => {
      e.nativeElement.onclick = () => {
        this.session = !this.session;
        this.cambios.detectChanges();
      };
    });

    this.render.listen('document', 'click', () => {
      this.formulario.forEach((form) => {
        if (form.nativeElement.nameUser) {
          form.nativeElement.nameUser.classList.remove('error');
          form.nativeElement.nameUser.placeholder = 'Nombre de usuario';
        }

        if (form.nativeElement.nombre) {
          form.nativeElement.nombre.classList.remove('error');
          form.nativeElement.nombre.placeholder = 'Nombre';
        }

        if (form.nativeElement.apellido) {
          form.nativeElement.apellido.classList.remove('error');
          form.nativeElement.apellido.placeholder = 'Apellido';
        }

        if (form.nativeElement.email) {
          form.nativeElement.email.classList.remove('error');
          form.nativeElement.email.placeholder = 'Email';
        }

        if (form.nativeElement.password) {
          form.nativeElement.password.classList.remove('error');
          form.nativeElement.password.placeholder = 'Contraseña';
        }

        this.errores.forEach((e) => {
          e.nativeElement.innerHTML = '';
        });
      });
    });
  }

  sessionAction(action: string) {
    if (this.sessionUser.valid && action === 'crear usuario') {
      let data = this.sessionUser.value;

      this.peticion.createUser(data).subscribe(
        () => {
          this.peticiones.getAmigosActivos().subscribe((data: []) => {
            this.usuario.amigosActivos = data;
            this.usuario.numAmigosActivos = data.length;
          });

          this.peticiones.getUser().subscribe((data: any) => {
            this.usuario.datos = data;
            this.message.nativeElement.style.display = 'flex';
            this.cambios.detectChanges();
          });
        },
        (error) => {
          this.errores.forEach((e) => {
            e.nativeElement.append(
              error?.error?.payload?.message ||
                error?.error?.output?.payload?.message
            );
          });
          this.cambios.detectChanges();
        }
      );
    } else if (
      !this.controls.email.errors &&
      !this.controls.password.errors &&
      action === 'iniciar session'
    ) {
      let { email, password } = this.sessionUser.value;
      this.iniciarSession = this.peticion
        .iniciarSession({ email, password })
        .subscribe(
          () => {
            this.router.navigate(['/home']);
            this.cambios.detectChanges();
          },
          (error) => {
            this.errores.forEach((e) => {
              e.nativeElement.append(
                error?.error?.payload?.message ||
                  error?.error?.output?.payload?.message
              );
            });
          }
        );
    } else {
      this.formulario.forEach((form) => {
        if (form.nativeElement.nombre)
          this.hasError(
            this.controls.nombre,
            'nombre',
            form.nativeElement.nombre
          );

        if (form.nativeElement.apellido)
          this.hasError(
            this.controls.apellido,
            'apellido',
            form.nativeElement.apellido
          );

        if (form.nativeElement.email)
          this.hasError(this.controls.email, 'email', form.nativeElement.email);

        if (form.nativeElement.password)
          this.hasError(
            this.controls.password,
            'password',
            form.nativeElement.password
          );

        if (form.nativeElement.nameUser)
          this.hasError(
            this.controls.nameUser,
            'nombre de usuario',
            form.nativeElement.nameUser
          );
      });
    }
  }

  hasError(inputControl, nombre, input: HTMLInputElement) {
    if (inputControl.errors) {
      let errors = Object.keys(inputControl.errors);
      errors.forEach((error) => {
        switch (error) {
          case 'required':
            input.placeholder = `Campo ${nombre} es requerido`;
            input.classList.add('error');
            break;

          case 'maxlength':
            input.value = '';
            input.placeholder = `Sobrepaso el limite de ${inputControl.errors.maxlength.requiredLength} letras`;
            input.classList.add('error');
            break;

          case 'email':
            input.value = '';
            input.placeholder = `Debes escribir un email`;
            input.classList.add('error');
            break;
        }
      });
    }
  }

  displayNone(e: HTMLElement) {
    e.style.display = 'none';
    this.session = !this.session;
  }

  ngOnDestroy() {
    this.iniciarSession.unsubscribe();
  }

  installEvent: any = null;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    console.log(event);
    event.preventDefault();
    this.installEvent = event;
  }

  installByUser() {
    if (this.installEvent) {
      this.installEvent.prompt();
      this.installEvent.userChoice.then((res: any) => console.log(res));
    }
  }
}
