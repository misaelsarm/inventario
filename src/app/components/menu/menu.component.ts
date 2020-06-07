import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  tipoUsuario: any;
  usuarioActual: any;
  email: any;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.authService.currentUser().subscribe((user) => {
      console.log(user);
      if (user) {
        const document = this.firestore.collection('Users').doc(user.uid);
        document.get().subscribe((doc) => {
          this.tipoUsuario = doc.data().tipoUsuario;
          this.usuarioActual = doc.data().nombreCompleto;
          this.email = doc.data().email;
        });
      }
    });
  }

  logOut() {
    this.firebaseAuth.signOut().then(() => {
      this.menu.close('perfil');
      this.router.navigateByUrl('/login');
    });
  }

}
