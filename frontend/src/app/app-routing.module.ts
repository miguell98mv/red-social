import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { SessionComponent } from './session/session.component';
import { AdminGuard } from './admin.guard';
const routes: Routes = [
  {
    path: 'perfil',
    canActivate: [AdminGuard],
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./perfil/perfil.module').then((m) => m.PerfilModule),
      },
    ],
  },
  {
    path: 'person/:id',
    canActivate: [AdminGuard],
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./perfil-amigo/perfil-amigo.module').then(
            (m) => m.PerfilAmigoModule
          ),
      },
    ],
  },
  {
    path: 'session',
    canActivate: [AdminGuard],
    component: SessionComponent,
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home-modulo/home-modulo.module').then(
            (m) => m.HomeModuloModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
