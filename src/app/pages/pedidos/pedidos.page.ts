import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  titulo = 'Pedidos';
  pedidos = [];
  accion = '';
  resultados= []

  _listFilter: string;
  uid: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.pedidos = this.listFilter ? this.buscarPedidos(this.listFilter) : this.resultados;
  }

  constructor(
    private inventarioService: InventarioService,
    private firestore: AngularFirestore,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.inventarioService.obtenerPedidos().subscribe((pedidos) => {
      this.resultados = pedidos;
      this.pedidos = this.resultados;
      console.log(this.pedidos);
      this.pedidos.forEach((orden, index) => {
        const data = [];
        this.firestore.collection('Pedidos').doc(orden.id).collection('Productos').get().toPromise().then(snapshot => {
          this.pedidos[index].productos = data;
          snapshot.forEach((el) => {
            data.push(el.data());
          });
        });
      });
    });
  }

  confirmar(pedido) {
    this.accion = 'confirmar';
    console.log(this.accion);
    this.presentAlertConfirm(pedido);
  }

  cancelarPedido(pedido) {
    this.accion = 'cancelar';
    this.presentAlertConfirm(pedido);
  }

  buscarPedidos(elementoBuscado: string) {
    elementoBuscado = elementoBuscado.toLowerCase();
    return this.resultados.filter((pedido) =>
      pedido.id.toLowerCase().indexOf(elementoBuscado) !== -1);
  }

  async presentToastWithOptions() {
    let header = '';
    let mensaje = '';

    if (this.accion === 'confirmar') {
      mensaje = `Se actualizo el estado del pedido a 'Entregado'`;
      header = 'Pedido entregado.';
    } else {
      header = 'Pedido cancelado';
      mensaje = `Se actualizo el estado del pedido a 'Cancelado'`;
    }

    const toast = await this.toastController.create({
      header: header,
      message: mensaje,
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

  async presentAlertConfirm(pedido) {

    let header = '';
    let mensaje = '';
    let boton = '';

    if (this.accion === 'confirmar') {
      mensaje = `El pedido se entregara a: ${pedido.nombreCliente}`;
      header = `Confirmar entrega de pedido: ${pedido.id}`;
      boton = 'Confirmar entrega'
    } else {
      header = `¿Estas seguro de cancelar el pedido: ${pedido.id}?`;
      mensaje = 'El pedido se cancelara';
      boton = 'Confirmar cancelacion'
    }
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: boton,
          handler: () => {
            if (this.accion === 'confirmar') {
              this.firestore.collection('Pedidos').doc(pedido.id).update({
                status: 'Entregado'
              }).then(() => {
                this.presentToastWithOptions();
              });
            } else {
              this.firestore.collection('Pedidos').doc(pedido.id).update({
                status: 'Cancelado'
              }).then(() => {
                this.presentToastWithOptions();
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
