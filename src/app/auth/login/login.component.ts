import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    remember: [false] //Sirve para cuando le indiquemos si queremos que nos recuerde el user y pass
  })

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.googleInit();
   }

  googleInit() {
    google.accounts.id.initialize({ //Pegamos el ID public de Google que esta en .env
      client_id: "578634656120-l4vl6c5o5v6d4v6qevfueiu5i63vbq5q.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });


    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any) {
    console.log('Encoded JWT ID token: ' + response.credential)
    this.usuarioService.loginGoogle( response.credential )
    .subscribe(
      {
        next: resp =>
        {
          //console.log({login: resp});
          this.router.navigateByUrl('/');
        }
      }
    )
  }


  login(){

    this.usuarioService.login(this.loginForm.value)
        .subscribe(
          {
            next: resp =>
            {
              console.log(resp);
              this.router.navigateByUrl('/');
            }, error: (err) => 
            {
              console.warn(err.error.msg)
            }
          }
        )
  }

}
