import { Injectable } from "@angular/core";

import { AlertController } from 'ionic-angular';
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../models/user";

@Injectable()
export class ImdbService {
  public user: User;

  constructor(
    private alertController: AlertController,
    private db: AngularFirestore,
    private firebase: AngularFireAuth
    ) {
    // this.getUser();
  }

  addToAlreadyWatched(id) {

  }

  addToWatchList(id) {

  }

  //TODO: FIX THIS
  private getUser() {
    this.db
      .collection("users")
      .doc(this.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        if (user !== undefined) {
          this.user = user;
        }
      });
  }

  private getUID() {
    let user: firebase.User;
    this.firebase.authState.subscribe(user => {
      user = user;
    });
    debugger;
    if (user !== null) { return user.uid; }
  }

}
