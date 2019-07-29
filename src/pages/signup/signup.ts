import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
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
import { TabsPage } from '../tabs/tabs';

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
    public loadingCtrl: LoadingController,
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

  signup() {
    let data = this.signupForm.value;

    if (!data.email) {
      this.signupError = "Please enter an email";
      return;
    }
    else if(data.password != data.passwordConf) {
      this.signupError = "Your passwords don't match";
      return;
    }
    
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Creating account...",
      showBackdrop: true,
    })
    loading.present()

    let credentials = {
			email: data.email,
			password: data.password
    };
    
    this.auth.signup(credentials).then(
			(u) => {
        loading.dismiss();
        this.addToDatabase(u.user.email, u.user.uid);
        this.navCtrl.setRoot(TabsPage, { tabIndex: 1 });
      },
			(error) => {
        loading.dismiss();
        this.signupError = error.message
      }
    );
  }

  private addToDatabase(email, id){
    let docRef = this.db.collection("users").doc(id);

    docRef.set(
      {
        email: email,
        watchList: [],
        alreadyWatched: []
      }
    )
    .then(function(docRef) {
        console.log("Document written with ID: ", id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
}
