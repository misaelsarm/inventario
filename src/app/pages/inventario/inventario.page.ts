import { Component, OnInit } from '@angular/core';
import { QrDataService } from 'src/app/services/qr-data.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { AlertController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  titulo = 'Inventario';

  productos: Producto[] = [];
  resultados = []

  _listFilter: string;
  uid: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.productos = this.listFilter ? this.buscar(this.listFilter) : this.resultados;
  }

  constructor(
    public qrDataService: QrDataService,
    private inventarioService: InventarioService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.inventarioService.obtenerProductos().subscribe(productos => {
      this.resultados = productos
      this.productos = this.resultados;
      console.log(this.productos);
    });
  }

  verProducto(producto) {
    this.presentAlertPrompt(producto);
  }

  buscar(elementoBuscado: string) {
    elementoBuscado = elementoBuscado.toLowerCase();
    return this.resultados.filter((producto) =>
      producto.nombre.toLowerCase().indexOf(elementoBuscado) !== -1);
  }

  async presentAlertPrompt(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Registro de nuevo producto',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre del producto',
          value: producto.nombre
        },
        {
          name: 'category',
          type: 'text',
          placeholder: 'Categoria del producto',
          value: producto.descripcion
        },
        {
          name: 'brand',
          type: 'text',
          placeholder: 'Marca del producto',
          value: producto.marca
        },
        {
          name: 'barcode',
          type: 'text',
          placeholder: 'Codigo del producto',
          value: producto.precio
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (value) => {
          }
        }
      ]
    });

    await alert.present();
  }

}
