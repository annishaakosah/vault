import { Injectable } from "@angular/core";

import { AlertController } from 'ionic-angular';
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from './auth.service';
import { User } from "../models/user";

@Injectable()
export class ImdbService {
  public user;

  constructor(
    private alertController: AlertController,
    private auth: AuthService,
    private db: AngularFirestore) {
      // this.addToDatabase();
      this.getUser();
  }

  addToAlreadyWatched(id) {

  }

  addToWatchList(id) {
    // let u = user;
  }

  private getUser() {
    let docRef = this.db.collection("users").doc(this.auth.currentUID());
    docRef
      .get()
      .subscribe((data) => {
        // if (user !== undefined) {
        //   this.user = user;
        // }
        console.log(data);
      });
    
  }
}
