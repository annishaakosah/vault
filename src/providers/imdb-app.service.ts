import { Injectable } from "@angular/core";

import { AlertController } from 'ionic-angular';
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from './auth.service';
import { User } from "../models/user";

@Injectable()
export class ImdbService {
  private user;
  private watchList;
  private alreadyWatched;

  constructor(
    private alertController: AlertController,
    private auth: AuthService,
    private db: AngularFirestore) {
      this.updateUser();
  }

  addToAlreadyWatched(id, poster_path) {
    if(this.getAlreadyWatched().has(id)) {return;}

    let docRef = this.db.collection("users").doc(this.auth.currentUID());
    docRef.update({
      "alreadyWatched": this.getAlreadyWatched().set(id, poster_path)
    });
  }

  addToWatchList(id, poster_path) {
    if(!this.watchList || this.watchList[id]) {return;}
    
    let docRef = this.db.collection("users").doc(this.auth.currentUID());
    docRef.set({
      "watchList": {
        [id]: poster_path
      }
    }, {merge:true})
  }

  private updateUser() {
    let docRef = this.db.collection("users").doc(this.auth.currentUID());
    docRef
      .valueChanges()
      .subscribe((user:User) => {
        if (user !== undefined) {
          this.user = user;
          this.watchList = user.watchList;
          this.alreadyWatched = user.alreadyWatched;
        }
    });
  }

  public getWatchList() {
    return (this.user !== undefined) ? this.watchList : null;
  }

  public getAlreadyWatched() {
    return (this.user !== undefined) ? this.alreadyWatched : null;
  }
}
