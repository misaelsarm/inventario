import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class QrDataService {

  productos = [];
  producto = new Producto();
  constructor() { }

  obtenerDatosQR(format: string, producto: Producto) {
    this.producto.nombre = producto.nombre;
    this.producto.descripcion = producto.descripcion;
    this.producto.precio = producto.precio;
    this.producto.marca = producto.marca;
    this.producto.imagenUrl = producto.imagenUrl;
  }
}
