import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LocalService} from '../../services/local.service';
import {User} from '../../model/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public urlLogin = '/login';
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: Router,
              private localService: LocalService, private userService: UserService) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  public saveInformation() {
    const user = new User();
    user.name = this.form.controls['name'].value;
    user.email = this.form.controls['email'].value;
    user.password = this.form.controls['password'].value;
    this.userService.createUser(user).subscribe(data => {
      console.log(data);
    });
  }

  /* public guardarInformacion() {
     if (this.form.valid) {
       const usuario = new Usuario();
       usuario.nombreCompleto = this.form.controls['nombre'].value;
       usuario.correo = this.form.controls['correo'].value;
       usuario.contrasena = this.form.controls['contrasena'].value;
       this.usuarioServiceService.guardarUsuario(usuario).subscribe(data => {
         this.toastServiceService.addSingle('success', 'Respuesta', data.message);
         this.route.navigate(['/login']);
       }, error => {
         if (error.status === 0) {
           this.toastServiceService.addSingle('error', 'ERROR:', 'Los servicios no están disponibles');
         } else {
           this.toastServiceService.addSingle('error', 'ERROR:', error.error.message);
         }
       });
     }
   }*/
}
