import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilAmigoComponent } from './perfil-amigo.component';
import { AdminGuard } from '../admin.guard';

const routes: Routes = [
  {
    path: 'sobre-mi',
    canActivate: [AdminGuard],
    component: PerfilAmigoComponent,
  },
  {
    path: 'amigos',
    canActivate: [AdminGuard],
    component: PerfilAmigoComponent,
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: PerfilAmigoComponent,
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
export class PerfilAmigoRoutingModule {}
