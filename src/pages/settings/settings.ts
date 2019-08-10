import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { ChangePasswordPage } from '../change-password/change-password';

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

  getAbout() {
    this.navCtrl.push(AboutPage)
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

  changePassword() {
    this.navCtrl.push(ChangePasswordPage)
  }

}
