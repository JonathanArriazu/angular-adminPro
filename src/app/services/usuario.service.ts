import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form-interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router: Router ) { }

  crearUsuario ( formData: any ) {
    
    //El primer argumento del post es el URL al que voy a enviar y el segundo es la data que voy a enviar
    return this.http.post(`${base_url}/usuarios`, formData) //Esto regresa un observable que trae la 
                                                            // informacion de lo que responde el backend 
                .pipe(
                  tap( (resp: any) => {
                    console.log(resp)
                    //localStorage.setItem('token', resp.token)
                  } )
                );
  }

  login ( formData: any ) {
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  } )
                );
  }

  loginGoogle( token: string ) {
    return this.http.post( `${base_url}/login/google`, { token } )
      .pipe(
        tap( (resp: any) => {
          console.log(resp)
          localStorage.setItem('token', resp.token)
        } )
      )
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')

    google.accounts.id.revoke( 'joni.arriazu2@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }

}
