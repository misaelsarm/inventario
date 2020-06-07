import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  productosCollection: AngularFirestoreCollection<Producto>;
  productos: Observable<any>;

  usuariosCollection: AngularFirestoreCollection<Usuario>;
  usuarios: Observable<any>;

  pedidosCollection: AngularFirestoreCollection<any>;
  pedidos: Observable<any>;

  constructor(private firestore: AngularFirestore) {
    this.getProductsCollection();
    this.getUsersCollection();
    this.getOrdersCollection();
  }

  obtenerProductos() {
    return this.productos;
  }

  obtenerUsuarios() {
    return this.usuarios;
  }

  obtenerPedidos() {
    return this.pedidos;
  }

  agregarProducto(producto: Producto) {
    this.productosCollection.add(producto);
  }

  getProductsCollection() {
    this.productosCollection = this.firestore.collection('Productos');
    this.productos = this.productosCollection.snapshotChanges().pipe((map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    })));
  }

  getUsersCollection() {
    this.usuariosCollection = this.firestore.collection('Users');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe((map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    })));
  }

  getOrdersCollection() {
    this.pedidosCollection = this.firestore.collection('Pedidos');
    this.pedidos = this.pedidosCollection.snapshotChanges().pipe((map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    })));
  }

}
