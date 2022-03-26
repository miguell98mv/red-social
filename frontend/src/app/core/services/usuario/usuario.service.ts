import { Injectable } from '@angular/core';
import { Usuario } from './usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  datos: Usuario;
  amigosActivos: [];
  numAmigosActivos: number;
  constructor() {}
}
