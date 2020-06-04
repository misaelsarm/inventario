import { Component } from '@angular/core';
import { QrDataService } from 'src/app/services/qr-data.service';
import { Producto } from 'src/app/models/producto.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-recientes',
  templateUrl: 'recientes.page.html',
  styleUrls: ['recientes.page.scss']
})
export class RecientesPage {

  recientes = []

  constructor(public qrData: QrDataService, private itemService: ItemService) {
    this.itemService.getItems().subscribe(recientes => {
      this.recientes = recientes;
    });
  }

  abrirRegistro(registro: Producto) {
    console.log(registro);
  }
}
