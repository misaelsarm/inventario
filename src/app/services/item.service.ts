import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Producto>;
  items: Observable<any>;

  constructor(private firestore: AngularFirestore) {
    this.itemsCollection = this.firestore.collection('Productos');
    this.items = this.itemsCollection.snapshotChanges().pipe((map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    })));
  }

  getItems() {
    return this.items;
  }

  addItem(producto: Producto) {
    this.itemsCollection.add(producto);
  }

}
