import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalService} from '../../services/local.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public urlRegister = '/register';
  public form: FormGroup;

  constructor(private localService: LocalService, private formBuilder: FormBuilder, private route: Router,
              private userService: UserService) {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    if (!!this.localService.getValue('user')) {
      this.route.navigate(['/dashboard']).then();
    }
  }

  public login() {
    if (this.form.valid) {
      this.userService.getUser(this.form.controls['email'].value,
        this.form.controls['password'].value).subscribe(data => {
        if (data && data.body) {
          const user = new User();
          user.email = data.body.email;
          user.password = data.body.password;
          user.name = data.body.name;
          user.id = data.body.id;
          this.localService.setValue('user', user);
          this.route.navigate(['/dashboard']).then();
        }
      });
    }
  }

  ngOnDestroy() {
  }

}
