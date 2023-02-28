import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public perfilForm: any;
  public usuario: any; //Aqui deberia ser usuario: Usuario pero da error, por eso coloco any
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService) {

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

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success')
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error')
        })
  }

  cambiarImagen( file: File) {
    this.imagenSubir = file;

    if (!file) {
      return; //Si el archivo no existe, entonces no continua con el codigo siguiente
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      //console.log(reader.result)
    }

  }

  subirImagen() {

    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then (img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
