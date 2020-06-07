import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios = []

  constructor(private inventarioService: InventarioService) { }

  ngOnInit() {
    this.inventarioService.obtenerUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    })

  }

}
