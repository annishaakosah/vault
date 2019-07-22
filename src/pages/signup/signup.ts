import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyVaultPage } from '../my-vault/my-vault';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../providers/auth.service';
import { MenuPage } from '../menu/menu';

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
    private auth:AuthService,
    private db:AngularFirestore,
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

    let credentials = {
			email: data.email,
			password: data.password
    };
    
    this.auth.signup(credentials).then(
			() => {
        this.addToDatabase(data.email); 
        this.navCtrl.setRoot(MenuPage);
      },
			error => this.signupError = error.message
    );
  }

  private addToDatabase(email){
    const docRef = this.db.doc(`users/${this.auth.getUID()}`);

    docRef.set({
      email: email,
      watchList: [],
      alreadyWatched: [],
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", this.auth.getUID());
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
}
