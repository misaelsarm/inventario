import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = new Usuario()

  constructor(private auth: AuthService, private firestore: AngularFirestore, private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log(form)
    if (form.invalid) {
      return;
    }
    this.auth.login(this.usuario).then((cred) => {
      const user = this.firestore.collection('Users').doc(cred.user.uid);
      user.get().toPromise().then((doc) => {
        const data = doc.data();

        Swal.fire({
          text: `Bienvenido ${data.nombreCompleto}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        }).then(() => {
          this.router.navigateByUrl('/tabs/inicio');
        });
      });
    }).catch((err) => {
      console.log(err);
      if (err.code === 'auth/user-not-found') {
        Swal.fire({
          title: 'Error',
          text: 'El correo ingresado no existe',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
      if (err.code === 'auth/wrong-password') {
        Swal.fire({
          title: 'Error',
          text: 'La contraseña es incorrecta',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
      if (err.code === 'auth/network-request-failed') {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrio un problema de conexión. Por favor intenta mas tarde.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }

}
