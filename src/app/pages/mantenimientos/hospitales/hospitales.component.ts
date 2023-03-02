import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  public hospitales: any = [];
  public cargando: boolean = true;

  constructor( private hospitalService: HospitalService ) { }

  ngOnInit(): void {

    this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.cargando = false;
        this.hospitales= hospitales;
      })
  }

}
