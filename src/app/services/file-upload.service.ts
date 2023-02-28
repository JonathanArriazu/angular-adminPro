import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto( //Lo hacemos async para utilizar el await internamente
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string //Todos estos son los argumentos que yo voy a recibir
  ) {
    try {

      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData(); //Esta es una manera de enviar infor al backend mediante el fetch
      formData.append('imagen', archivo); //Hacemos el append de lo que necesito enviar en el body

      const resp = await fetch( url, { 
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if ( data.ok ) {
        return data.nombreArchivo
      } else {
        console.log(data.msg)
        return false
      }
      
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
