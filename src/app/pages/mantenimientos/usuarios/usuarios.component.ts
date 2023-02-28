import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;

  constructor( private usuarioServoce: UsuarioService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioServoce.cargarUsuarios( this.desde )
    .subscribe( ({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
    })
  }

  cambiarPagina(valor: number) {
    this.desde +=valor;

    if ( this.desde < 0 ) {
      this.desde = 0 //Para que el this.desde nunca sea menor a 0
    } else if ( this.desde > this.totalUsuarios ) {
      this.desde -= valor; //Para evitar que el this.desde sea mayor al numero de usuarios totales
    }

    this.cargarUsuarios();

  }

}
