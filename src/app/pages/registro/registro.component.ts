import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService, 
               private router: Router ) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();

    //this.usuario.email = "ivette.jorquera.buzeta@gmail.com";
  }

 onSubmit( form: NgForm ) {
   if ( form.invalid ){ return; }
   console.log("Formulario Enviado");
   console.log(this.usuario);
   console.log(form);  

   Swal.fire({ allowOutsideClick: false,
    icon: 'info', 
   text: 'Espere por favor'
   });

    Swal.showLoading();    

   this.auth.nuevoUsuario( this.usuario ).subscribe( resp => {
     console.log(resp);
     Swal.close();
     if ( this.recordarme ){
      localStorage.setItem('email', this.usuario.email);
    }
     this.router.navigateByUrl('/home');
   }, (err) => {
     console.log(err.error.error.message);

     Swal.fire({ 
      icon: 'error',
      title: 'Error al autenticar', 
     text: err.error.error.message
     });

   });
  }
}
