import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public tipo: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  abrirModal(
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: any,
    img: string = 'no-img'
  ) {
    this.tipo = tipo;
    this.id= id;
    /* this.img = img || ''; */

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

}
