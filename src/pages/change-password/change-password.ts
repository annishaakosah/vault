import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  changePwForm: FormGroup;
  error: string;

  constructor(
    public navCtrl: NavController, 
    public fb: FormBuilder, 
    public loadingCtrl: LoadingController,
    public navParams: NavParams, 
    private auth: AuthService) {
    this.changePwForm = fb.group({
      currentPassword: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      newPassword: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      confirmNewPassword: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      )
    });
  }

  ionViewDidLoad() {
    this.navCtrl.swipeBackEnabled = true;
  }

  validateAndChangePassword() {
    let data = this.changePwForm.value;

    if (data.currentPassword == data.newPassword) {
      this.error = "You have to choose a new password";
      return;
    }
    else if(data.newPassword != data.confirmNewPassword) {
      this.error = "Your passwords don't match";
      return;
    }

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Changing password...",
      showBackdrop: true,
    })
    loading.present()

    this.auth.verifyPassword(data.currentPassword).then(
      (u) => {
        this.auth.updatePassword(data.newPassword).then(
          (u) => {
            loading.dismiss();
            this.navCtrl.setRoot(TabsPage, {tabIndex: 3})
          },
          (error) => {
            loading.dismiss();
            this.error = error.message;
            return;
          }
        )
      },
      (error) => {
        loading.dismiss();
        this.error = "Your password is incorrect"
        return;
      }
    )
  }

}
