import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class QrDataService {

  productos = [];
  constructor() { }

  obtenerDatosQR(format: string, data) {
    const nuevoProdcuto = new Producto(format, data.name, data.brand, data.category, data.barcode);
  }
}
