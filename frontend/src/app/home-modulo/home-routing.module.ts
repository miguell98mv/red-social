import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AdminGuard } from '../admin.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AdminGuard],
    component: HomeComponent,
  },
  {
    path: 'search/:persona',
    canActivate: [AdminGuard],
    component: HomeComponent,
  },

  {
    path: 'mensajes',
    canActivate: [AdminGuard],
    component: HomeComponent,
    children: [
      {
        path: ':idAmigo',
        canActivate: [AdminGuard],
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'notificaciones',
    canActivate: [AdminGuard],
    component: HomeComponent,
  },
  {
    path: 'solicitudes',
    canActivate: [AdminGuard],
    component: HomeComponent,
  },
  {
    path: 'amigos-activos',
    canActivate: [AdminGuard],
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
