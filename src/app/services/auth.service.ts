import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth) { }

  async login(usuario: Usuario) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
    };
    const cred = await this.firebaseAuth.signInWithEmailAndPassword(authData.email, authData.password);
    return cred;
  }

  async nuevoUsuario(usuario: Usuario) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    const cred = await this.firebaseAuth.createUserWithEmailAndPassword(authData.email, authData.password);
    return cred;
  }
}
