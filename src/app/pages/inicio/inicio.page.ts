import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  titulo = 'Inicio';
  productos = [];
  pedidos = [];
  usuarios = [];
  clientes = [];
  admins = [];

  constructor(private inventarioService: InventarioService) { }

  ngOnInit() {

    this.inventarioService.obtenerPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
      console.log(this.pedidos);
    });

    this.inventarioService.obtenerUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.obtenerClientes(this.usuarios);
      this.obtenerAdmins(this.usuarios);
    });

    this.inventarioService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  obtenerClientes(usuarios: Usuario[]) {
    usuarios.forEach(element => {
      if (element.tipoUsuario === 'Cliente') {
        this.clientes.push(element);
      }
    });
  }

  obtenerAdmins(usuarios: Usuario[]) {
    usuarios.forEach(element => {
      if (element.tipoUsuario === 'Administrador') {
        this.admins.push(element);
      }
    });
  }

}
