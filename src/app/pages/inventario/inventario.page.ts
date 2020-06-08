import { Component, OnInit } from '@angular/core';
import { QrDataService } from 'src/app/services/qr-data.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  titulo = 'Inventario';

  productos: Producto[] = [];
  resultados = [];
  producto = new Producto();

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
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.inventarioService.obtenerProductos().subscribe(productos => {
      this.resultados = productos;
      this.productos = this.resultados;
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
    this.producto = producto;
    const alert = await this.alertController.create({
      header: 'Actualizar datos de producto',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre del producto',
          value: producto.nombre
        },
        {
          name: 'descripcion',
          type: 'text',
          placeholder: 'Descripcion del producto',
          value: producto.descripcion
        },
        {
          name: 'marca',
          type: 'text',
          placeholder: 'Marca del producto',
          value: producto.marca
        },
        {
          name: 'precio',
          type: 'text',
          placeholder: 'Precio del producto',
          value: producto.precio
        },
        {
          name: 'imagenUrl',
          type: 'text',
          placeholder: 'URL de imagen a mostrar',
          value: producto.imagenUrl
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (producto) => {
            this.firestore.collection('Productos').doc(this.producto.id).update({
              nombre: producto.nombre,
              precio: producto.precio,
              marca: producto.marca,
              descripcion: producto.descripcion,
              imagenUrl: producto.imagenUrl
            }).then(() => {
              this.presentToastWithOptions();
            });
          }
        }
      ]
    });

    await alert.present();
  }


  async presentToastWithOptions() {

    const toast = await this.toastController.create({
      header: 'Inventario',
      message: 'Datos de producto actualizados',
      position: 'bottom',
      duration: 4000,
      color: 'success',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-outline',
        }
      ]
    });
    toast.present();
  }

}
