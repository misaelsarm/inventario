import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QrDataService } from 'src/app/services/qr-data.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.model';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss']
})
export class ScanPage {

  swipeOptions = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  constructor(
    private inventarioService: InventarioService,
    private barcodeScanner: BarcodeScanner,
    private qrDataService: QrDataService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }
  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (!barcodeData.cancelled) {
        const data = JSON.parse(barcodeData.text);
        this.qrDataService.obtenerDatosQR(barcodeData.format, data);
        this.presentAlertPrompt(barcodeData.format, data);
      }
    }).catch(err => {
      console.log(err);
      const datos = {
        nombre: 'Martillo',
        descripcion: `Lorem Ipsum is simply dummy text of the printing`,
        precio: 129,
        marca: 'Truper',
        imagenUrl: ''
      };
      this.qrDataService.obtenerDatosQR('QR', datos);
      console.log('Guardado!');
      this.presentAlertPrompt('QR', datos);
    });
  }

  async presentAlertPrompt(format: string, producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Registro de nuevo producto',
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
          name: 'precio',
          type: 'text',
          placeholder: 'Precio del producto',
          value: producto.precio
        },
        {
          name: 'marca',
          type: 'text',
          placeholder: 'Marca del producto',
          value: producto.marca
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
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (producto: Producto) => {
            const date = new Date();
            const registro: Producto = {
              format,
              nombre: producto.nombre,
              descripcion: producto.descripcion,
              precio: producto.precio,
              marca: producto.marca,
              imagenUrl: producto.imagenUrl,
              created: `${date.toDateString()} - ${date.toLocaleTimeString()}`
            };
            this.inventarioService.agregarProducto(registro);
            this.presentToastWithOptions();
          }
        }
      ]
    });

    await alert.present();
  }

  /* async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Listo',
      message: 'Se registro un nuevo producto con exito.',
      buttons: ['OK']
    });

    await alert.present();
  } */

  async presentToastWithOptions() {

    const toast = await this.toastController.create({
      header: 'Inventario',
      message: 'Producto agregado con exito',
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
