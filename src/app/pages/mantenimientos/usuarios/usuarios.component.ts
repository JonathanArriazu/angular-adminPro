import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = false;

  constructor( private usuarioServoce: UsuarioService,
               private busquedaService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioServoce.cargarUsuarios( this.desde )
    .subscribe( ({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
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

  buscar(termino: string) {

    if (termino.length === 0) {
      //return; //Pero si realizo esto, al borrar luego de la busqueda, se quedaran los 
              //usuarios buscados y no se actualizaran a la tabla de todos los usuarios
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios', termino)
      .subscribe(resp => {
        this.usuarios = resp
      })
  }

  eliminarUsuario(usuario: Usuario){

    if ( usuario.uid === this.usuarioServoce.uid ) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta apunto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServoce.eliminarUsuario( usuario )
          .subscribe( resp => {

            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
              );
              this.cargarUsuarios(); //Para que se actualice la pagina luego de borrarla
          });

      }
    })
  }

  cambiarRole(usuario:Usuario) {
    this.usuarioServoce.guardarUsuario( usuario )
    .subscribe( resp => {
      console.log('Se cambio el rol')
      console.log(resp)
    })
  }

}
