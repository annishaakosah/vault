import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login() {

  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
