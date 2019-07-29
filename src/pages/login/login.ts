import { Component } from '@angular/core';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/auth.service';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
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
    public loadingCtrl: LoadingController,
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
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Logging in...",
      dismissOnPageChange: true,
      showBackdrop: true,
    })
    loading.present()

    let credentials = {
			email: data.email,
			password: data.password
    };

    this.auth.login(credentials)
      .then(
        () => {
          loading.dismiss()
          this.navCtrl.setRoot(TabsPage);
        },
        error => {
          loading.dismiss()
          this.loginError = error.message;
        }
      );
  }
}
