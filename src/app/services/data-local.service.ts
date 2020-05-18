import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros: Registro[] = [];
  constructor() { }

  guardarRegistro(format: string, data) {
    const nuevoRegistro = new Registro(format, data.name, data.brand, data.category, data.barcode);
    this.registros.unshift(nuevoRegistro);
    console.log(this.registros);
  }
}
