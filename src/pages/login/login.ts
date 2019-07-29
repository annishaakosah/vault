import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth.service';
import { TabsPage } from '../tabs/tabs';

import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loginForm: FormGroup;
  loginError: string;

  constructor(
    private auth: AuthService,
    public fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.loginForm = fb.group({
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      )
    });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  async login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
			email: data.email,
			password: data.password
    };

    this.auth.login(credentials)
      .then(
        () => {
          this.navCtrl.setRoot(TabsPage);
        },
        error => {
          this.loginError = error.message;
        }
      );
  }
}
