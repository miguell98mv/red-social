import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { AdminGuard } from '../admin.guard';

const routes: Routes = [
  {
    path: 'configuracion',
    canActivate: [AdminGuard],
    component: PerfilComponent,
  },
  {
    path: 'sobre-mi',
    canActivate: [AdminGuard],
    component: PerfilComponent,
  },
  {
    path: 'amigos',
    canActivate: [AdminGuard],
    component: PerfilComponent,
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: PerfilComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
