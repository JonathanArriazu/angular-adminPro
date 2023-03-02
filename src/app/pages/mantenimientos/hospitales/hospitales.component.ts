import { Component, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  public hospitales: any = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busquedaService: BusquedasService  ) { }

  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe( delay(100))
      .subscribe( img => this.cargarHospitales())

  }

  buscar(termino: string) {

    if (termino.length === 0) {
      //return; //Pero si realizo esto, al borrar luego de la busqueda, se quedaran los 
              //usuarios buscados y no se actualizaran a la tabla de todos los usuarios
      return this.cargarHospitales();
    }

    this.busquedaService.buscar('hospitales', termino)
      .subscribe(resp => {
        this.hospitales = resp
      })
  }

  cargarHospitales() {
    this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.cargando = false;
        this.hospitales= hospitales;
      })
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id || '', hospital.nombre)
      .subscribe( resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      })
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id || '')
      .subscribe( resp => {
        Swal.fire('Borrado', hospital.nombre, 'success');
        this.cargarHospitales();
      })
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: ' Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })
    
    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital (value!)
        .subscribe( (resp: any) => {
          this.hospitales.push(resp.hospital)
        })
    }
  }

  mostrarInfo(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

}
