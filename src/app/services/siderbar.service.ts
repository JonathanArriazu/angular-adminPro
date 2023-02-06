import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiderbarService {

  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Progress', url: 'progress' },
        { titulo: 'Graficas', url: 'grafica1' },
      ]
    }
  ]

  constructor() { }
}
