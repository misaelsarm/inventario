import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QrDataService } from 'src/app/services/qr-data.service';
import { AlertController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss']
})
export class ScanPage {

  swipeOptions = {
    allowSlidePrev: false,
    allowSlideNext: false
  }
  constructor(
    private itemService: ItemService,
    private barcodeScanner: BarcodeScanner,
    private qrDataService: QrDataService,
    private alertController: AlertController
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
      /* this.qrDataService.obtenerDatosQR('QR', { name: 'Test name', brand: 'Test brand', category: 'Test category', barcode: '0101010110' });
      console.log('Guardado!');
      this.presentAlertPrompt('QR', { name: 'Test name', brand: 'Test brand', category: 'Test category', barcode: '0101010110' }); */
    });
  }

  async presentAlertPrompt(format: string, data) {
    const alert = await this.alertController.create({
      header: 'Registro de nuevo producto',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre del producto',
          value: data.name
        },
        {
          name: 'category',
          type: 'text',
          placeholder: 'Categoria del producto',
          value: data.category
        },
        {
          name: 'brand',
          type: 'text',
          placeholder: 'Marca del producto',
          value: data.brand
        },
        {
          name: 'barcode',
          type: 'text',
          placeholder: 'Codigo del producto',
          value: data.barcode
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
            const date = new Date();
            const registro: Producto = {
              format,
              name: value.name,
              category: value.category,
              brand: value.brand,
              barcode: value.barcode,
              created: `${date.toDateString()} - ${date.toLocaleTimeString()}`
            };
            this.itemService.addItem(registro);
            this.presentAlert();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Listo',
      message: 'Se registro un nuevo producto con exito.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
