import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from './auth.service';
import { User } from "../models/user";
import firebase from "firebase";

@Injectable()
export class ImdbService {
  private user: User;
  private watchList;
  private alreadyWatched;

  constructor(
    private auth: AuthService,
    private db: AngularFirestore) {
      this.updateUser();
  }

  addToAlreadyWatched(id, poster_path) {
    if(!this.alreadyWatched || this.alreadyWatched[id]) {return;}

    let docRef = this.db.collection("users").doc(this.auth.currentUID());
    docRef.set({
      "alreadyWatched": {
        [id]: poster_path
      }
    }, {merge:true})
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

  isInWatchList(id) {
    return this.watchList[id] !== undefined
  }

  isInAlreadyWatched(id) {
    return this.alreadyWatched[id] !== undefined
  }

  removeFromWatchList(id) {
    if(!this.watchList || !this.watchList[id]) {return;}
    
    let docRef = this.db.collection("users").doc(this.auth.currentUID());
    docRef.update({
      ["watchList."+id]: firebase.firestore.FieldValue.delete()  
    })
  }

  removeFromAlreadyWatched(id) {
    if(!this.alreadyWatched || !this.alreadyWatched[id]) {return;}
    
    let docRef = this.db.collection("users").doc(this.auth.currentUID());
    docRef.update({
      ["alreadyWatched."+id]: firebase.firestore.FieldValue.delete()  
    })
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
