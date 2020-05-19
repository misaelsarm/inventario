import { Component, OnInit } from '@angular/core';
import { QrDataService } from 'src/app/services/qr-data.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  productos = [];

  constructor(public qrDataService: QrDataService, private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.productos = items;
      console.log(this.productos);
    });
  }

}
