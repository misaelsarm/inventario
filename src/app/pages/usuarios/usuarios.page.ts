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

  titulo = 'Usuarios';

  usuarios = [];
  resultados = [];

  _listFilter: string;
  uid: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.usuarios = this.listFilter ? this.buscar(this.listFilter) : this.resultados;
  }

  constructor(private inventarioService: InventarioService) { }

  ngOnInit() {
    this.inventarioService.obtenerUsuarios().subscribe((usuarios) => {
      this.resultados = usuarios;
      this.usuarios = this.resultados;
    });
  }

  buscar(elementoBuscado: string) {
    elementoBuscado = elementoBuscado.toLowerCase();
    return this.resultados.filter((usuario) =>
      usuario.nombreCompleto.toLowerCase().indexOf(elementoBuscado) !== -1);
  }
}
