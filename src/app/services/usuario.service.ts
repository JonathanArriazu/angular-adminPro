import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }

  crearUsuario ( formData: RegisterForm ) {
    
    //El primer argumento del post es el URL al que voy a enviar y el segundo es la data que voy a enviar
    return this.http.post(`${base_url}/usuarios`, formData); //Esto regresa un observable que trae la 
                                                            // informacion de lo que responde el backend 
  }

}
