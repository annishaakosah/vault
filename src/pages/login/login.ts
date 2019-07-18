import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { SignupPage } from '../signup/signup';
import { MyVaultPage } from '../my-vault/my-vault';

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
    private firebase: AngularFireAuth,
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
      this.loginError = "Please enter an email"
      return;
    }

    this.firebase.auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(
        () => {
          this.navCtrl.setRoot(MyVaultPage);
        },
        error => {
          this.loginError = error.message;
        }
      );
  }
}
