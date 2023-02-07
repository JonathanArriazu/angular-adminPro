import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html'
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    })

/*     const promesa = new Promise( (resolve, reject) => {
      if (true) {
        resolve('Hola mundo!')
      } else {
        reject('Algo salio mal')
      }
    });

    promesa.then( (mensaje) => {
      console.log(mensaje)
    })
    .catch( error => console.log("Error en mi promesa", error));

    console.log("Fin del init!") */

  }

  getUsuarios() {
    const promesa = new Promise ( resolve => {
      fetch('https://reqres.in/api/users')
        .then(response => response.json())
        .then(body => console.log(body.data))
        .catch(error => console.log(error))
    })
    return promesa;
  }

}
