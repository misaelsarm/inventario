import { Component } from '@angular/core';
import { QrDataService } from 'src/app/services/qr-data.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-recientes',
  templateUrl: 'recientes.page.html',
  styleUrls: ['recientes.page.scss']
})
export class RecientesPage {

  constructor(public qrData: QrDataService) { }

  abrirRegistro(registro: Producto) {
    console.log(registro);
  }
}
