import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  //public imgUrl;
  public usuario: Usuario | undefined;

  constructor( private usuarioService: UsuarioService ) { 
    //this.imgUrl = usuarioService.usuario?.imagenUrl;
    this.usuario = usuarioService.usuario;
   }

  logout() {
    this.usuarioService.logout();
  }

}
