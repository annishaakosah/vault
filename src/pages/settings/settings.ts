import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    private auth: AuthService) {
  }

  logOut() {
    this.auth.logOut();
    this.appCtrl.getRootNav().push(LoginPage);
  }

  deleteAccount() {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Are you sure you want to permanently delete your account?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.auth.deleteAccount();
            this.appCtrl.getRootNav().push(LoginPage);
          }
        }
      ]
    })
    alert.present();
  }

}
