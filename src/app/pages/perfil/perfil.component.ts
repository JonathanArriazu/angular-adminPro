import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public perfilForm: any;
  public usuario: any; //Aqui deberia ser usuario: Usuario pero da error, por eso coloco any

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService) {

                this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required],
      email: [ this.usuario.email , [Validators.required, Validators.email]]
    })

  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( resp => {
          const {nombre, email} = this.perfilForm.value; //Extraemos nombre e email

          this.usuario.nombre = nombre;
          this.usuario.email = email;
        })
  }

}
