import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = '';

  constructor( public modalImagenService: ModalImagenService,
               public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = '';
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then (img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

        this.modalImagenService.nuevaImagen.emit(img);

        this.cerrarModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
