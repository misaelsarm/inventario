import { Component } from '@angular/core';
import { QrDataService } from 'src/app/services/qr-data.service';
import { Producto } from 'src/app/models/producto.model';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-recientes',
  templateUrl: 'recientes.page.html',
  styleUrls: ['recientes.page.scss']
})
export class RecientesPage {

  recientes = []

  constructor(public qrData: QrDataService, private inventarioService: InventarioService) {
    this.inventarioService.obtenerProductos().subscribe(recientes => {
      this.recientes = recientes;
    });
  }

  abrirRegistro(registro: Producto) {
    console.log(registro);
  }
}
