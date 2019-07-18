import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
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
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;
  signupError: string;

  constructor(
    private firebase:AngularFireAuth,
    public fb: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams) 
    {
      this.signupForm = fb.group({
        email: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.email])
        ),
        password: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.minLength(6)])
        ),
        passwordConf: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.minLength(6)])
        )
      });
  }

  async signup() {
    let data = this.signupForm.value;

    if (!data.email) {
      this.signupError = "Please enter an email";
      return;
    }
    else if(data.password != data.passwordConf) {
      this.signupError = "Your passwords don't match";
      return;
    }

    this.firebase.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(
        () => {
          this.navCtrl.setRoot('MyVaultPage');
        },
        error => {
          this.signupError = error.message;
        }
      );
  }
}
