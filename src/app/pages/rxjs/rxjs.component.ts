import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription} from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators'


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;
  
  constructor() {    

    /* this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
      valor => console.log('Subs:', valor),
      err => console.warn('Error:', err),
      () => console.info("obs terminado!") //El complete no recibe ningun argumento, por eso se coloca () para indicar esto
    ); */

      this.intervalSubs = this.retornaIntervalo()
      .subscribe(
        (valor) => console.log(valor)
      )
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

   retornaIntervalo(): Observable<number>  {
    return interval(500) //El map me sirve para transformar la informacion que recibe el onservable y mutarla de la manera que yo ncesito
                        .pipe(
                          take(4), //el take dice cuantas emisiones del observable necesita y automaticamente completa el observable
                          map( valor => {
                            //return "Hola mundo!" //Esto me daria 4 hola mundos xqe transforma el valor en lo que yo le digo
                            return valor + 1;
                          }),
                          filter(valor => ( valor % 2 === 0) ? true: false)
                        )
   }

   retornaObservable(): Observable<number> {
    let i = -1;
    
    const obs$ = new Observable<number>( observer => {

      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        if (i  === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if(i === 2){
          i=0;
          observer.error('I llego al valor de 2');
        }
      }, 1000 )

    } );

    return obs$
   }



}
