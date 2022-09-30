import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalService} from '../../services/local.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public urlRegister = '/register';
  public form: FormGroup;

  constructor(private localService: LocalService, private formBuilder: FormBuilder, private route: Router) {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.localService.getValue('user'));
    if (!!this.localService.getValue('user')) {
      console.log('HOLA');
      this.route.navigate(['/dashboard']).then();
    }
  }

  public login() {
    if (this.form.valid) {
      const user = new User();
      user.email = this.form.controls['email'].value;
      user.password = this.form.controls['password'].value;
      this.localService.setValue('user', user);
      this.route.navigate(['/dashboard']).then();
    }
    /*    if (this.form.valid) {
          this.usuarioServiceService.iniciarSesion(this.form.controls['correo'].value,
            this.form.controls['contrasena'].value).subscribe(data => {
            this.localService.setJsonValue('user_akatsuki', data.body);
            this.route.navigate(['/clientes']);
          }, error => {
            if (error.status === 0) {
              this.toastServiceService.addSingle('error', 'ERROR:', 'Los servicios no están disponibles');
            } else {
              this.toastServiceService.addSingle('error', 'ERROR:', error.error.message);
            }
          });
        }*/
  }

  ngOnDestroy() {
  }

}
