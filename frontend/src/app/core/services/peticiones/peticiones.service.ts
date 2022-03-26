import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../.../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeticionesService {
  constructor(public http: HttpClient) {}

  createUser(data: any) {
    return this.http.post(`${environment.url}/user`, data);
  }

  iniciarSession(data: any) {
    return this.http.post(`${environment.url}/user/login`, data);
  }

  cerrarSession() {
    return this.http.post(`${environment.url}/socket/logout`, '');
  }

  getUser() {
    return this.http.get(`${environment.url}/myuser/user`);
  }

  getPostHome(data) {
    return this.http.post(`${environment.url}/myUser/post-home`, data);
  }

  getAmigos() {
    return this.http.get(`${environment.url}/myUser/amigos`);
  }

  getNameUser(idUser) {
    return this.http.get(`${environment.url}/myUser/nameUser/${idUser}`);
  }

  addComentario(data) {
    return this.http.post(`${environment.url}/socket/comentarios`, data);
  }

  getComentarios(data) {
    return this.http.get(`${environment.url}/socket/comentarios/${data}`);
  }

  myLike(idPost) {
    return this.http.get(`${environment.url}/myUser/myLike/${idPost}`);
  }

  getLikes(idPost) {
    return this.http.get(`${environment.url}/myUser/like/${idPost}`);
  }

  addLike(idPost) {
    return this.http.post(`${environment.url}/socket/like`, idPost);
  }

  getAmigosActivos() {
    return this.http.get(`${environment.url}/myUser/activos`);
  }

  getMensajeAmigo(idUser: string) {
    return this.http.get(`${environment.url}/mensajes/${idUser}`);
  }

  addMensajeAmigo(data) {
    return this.http.post(`${environment.url}/mensajes`, data);
  }

  search(search) {
    return this.http.get(`${environment.url}/myUser/search/${search}`);
  }

  isAmigo(idUser) {
    return this.http.get(`${environment.url}/myUser/isAmigo/${idUser}`);
  }

  addAmigo(idAmigo) {
    return this.http.post(`${environment.url}/myUser/amigos`, {
      idAmigo: idAmigo,
    });
  }

  removeAmigo(idAmigo) {
    return this.http.delete(`${environment.url}/myUser/removeAmigo/${idAmigo}`);
  }

  removeAmigoUser(idAmigo) {
    return this.http.delete(
      `${environment.url}/myUser/removeAmigoUser/${idAmigo}`
    );
  }

  getChatUser() {
    return this.http.get(`${environment.url}/mensajes/`);
  }

  isActivo(idUser) {
    return this.http.get(`${environment.url}/myUser/isActive/${idUser}`);
  }

  visto(idUser) {
    return this.http.get(`${environment.url}/mensajes/visto/${idUser}`);
  }

  mensajeAmigo(data) {
    return this.http.post(`${environment.url}/mensajes/mensajeAmigo`, data);
  }

  newMensaje() {
    return this.http.get(`${environment.url}/mensajes/newMensaje`);
  }

  notNewMensaje() {
    return this.http.get(`${environment.url}/mensajes/notNewMensaje`);
  }

  getSolicitudes() {
    return this.http.get(`${environment.url}/myUser/solocitud`);
  }

  aceptarSolicitud(data) {
    return this.http.post(`${environment.url}/myUser/aceptarAmistad`, data);
  }

  newSolicitud() {
    return this.http.get(`${environment.url}/myUser/newSolicitud`);
  }

  noNewSolicitud() {
    return this.http.get(`${environment.url}/myUser/noNewSolicitud`);
  }

  getNotificaciones() {
    return this.http.get(`${environment.url}/myUser/getNotificaciones`);
  }

  newNotificacion() {
    return this.http.get(`${environment.url}/myUser/newNotificacion`);
  }

  noNewNotificacion() {
    return this.http.get(`${environment.url}/myUser/noNewNotificacion`);
  }

  addNombre(data) {
    return this.http.post(`${environment.url}/session/addNombre`, data);
  }

  editPassword(data) {
    return this.http.post(`${environment.url}/session/editPassword`, data);
  }

  generoMusical(data) {
    return this.http.post(`${environment.url}/session/genero_musical`, data);
  }

  que_te_gusta(data) {
    return this.http.post(`${environment.url}/session/que_te_gusta`, data);
  }

  profesion(data) {
    return this.http.post(`${environment.url}/session/profesion`, data);
  }

  telefono(data) {
    return this.http.post(`${environment.url}/session/telefono`, data);
  }

  ubicacion(data) {
    return this.http.post(`${environment.url}/session/ubicacion`, data);
  }

  myPosts() {
    return this.http.get(`${environment.url}/session/myPosts`);
  }

  userPosts(idUser) {
    return this.http.get(`${environment.url}/session/userPosts/${idUser}`);
  }

  getAmigosUser(idUser) {
    return this.http.get(`${environment.url}/session/getAmigosUser/${idUser}`);
  }

  getPersonUser(idUser) {
    return this.http.get(`${environment.url}/session/getPersonUser/${idUser}`);
  }

  addPost(data) {
    let datos = new FormData();
    datos.append('imagen', data.archivo);
    datos.append('texto', data.texto);
    return this.http.post(`${environment.url}/myUser/post`, datos);
  }

  addImagen(imagen) {
    let datos = new FormData();
    datos.append('imagen', imagen);
    datos.append('texto', 'texto');
    return this.http.post(`${environment.url}/session/imagen_perfil`, datos);
  }
}
