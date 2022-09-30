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
    this.userService.createUser(user).subscribe(() => {
      this.route.navigate(['/login']);
    });
  }

}
