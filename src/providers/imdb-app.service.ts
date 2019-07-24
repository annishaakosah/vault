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
      this.getUser();
  }

  addToAlreadyWatched(id) {
    if(this.getAlreadyWatched().includes(id)) {return;}

    let docRef = this.db.collection("users").doc(this.auth.currentUID());
    docRef.update({
      "alreadyWatched": this.getAlreadyWatched().concat(id)
    });
  }

  addToWatchList(id) {
    if(this.getWatchList().includes(id)) {return;}

    let docRef = this.db.collection("users").doc(this.auth.currentUID());
    docRef.update({
      "watchList": this.getWatchList().concat(id)
    });
  }

  private getUser() {
    let docRef = this.db.collection("users").doc(this.auth.currentUID());
    docRef
      .valueChanges()
      .subscribe((user) => {
        if (user !== undefined) {
          this.user = user;
        }
    });
  }

  public getWatchList = () => this.user.watchList;
  public getAlreadyWatched = () => this.user.alreadyWatched;
}
