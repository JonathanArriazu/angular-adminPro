import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SiderbarService } from '../../services/siderbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario: Usuario | undefined;
  //public imgUrl;
  //public name: string | undefined;

  constructor( private siderbarService: SiderbarService,
               private usuarioService: UsuarioService) { 
    this.menuItems = siderbarService.menu;
    //this.imgUrl = usuarioService.usuario?.imagenUrl;
    //this.name = usuarioService.usuario?.nombre;
    this.usuario = usuarioService.usuario;
  }



  ngOnInit(): void {
  }

}
