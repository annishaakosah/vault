import { Injectable } from "@angular/core";

import { AlertController } from 'ionic-angular';
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from './auth.service';
import { User } from "../models/user";

@Injectable()
export class ImdbService {
  public user: User;

  constructor(
    private alertController: AlertController,
    private auth: AuthService,
    private db: AngularFirestore) {
      this.getUser();
    }

  addToAlreadyWatched(id) {

  }

  addToWatchList(id) {

  }

  private getUser() {
    this.db
      .collection("users")
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        if (user !== undefined) {
          this.user = user;
        }
      });
  }
}
