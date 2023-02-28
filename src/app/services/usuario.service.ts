import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form-interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario | undefined;

  constructor( private http: HttpClient,
               private router: Router ) { }
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario?.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  validarToken() : Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
        localStorage.setItem('token', resp.token)
        return true
      }),
      //map(resp => true), //Si tengo respuesta, retorno true
      catchError( error => of(false) )
    )
  }

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

  actualizarPerfil(data: {email:string, nombre: string, role: string}) { //Seria mnejor crear una interface pero esto tambien se puede hacer

    data = {
      ...data,
      role: this.usuario?.role || ''
    };

    return this.http.put(`${base_url}/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    })
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
    
    google.accounts.id.revoke('joni.arriazu2@gmail.com', () => {      
      this.router.navigateByUrl('/login');
    })
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuario>( url, this.headers)
            .pipe(
              map( resp => {
                const usuarios = resp.usuarios.map( 
                  user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid) 
                  )
                return {
                  total: resp.total,
                  usuarios
                }
              })
            )
  }

}
