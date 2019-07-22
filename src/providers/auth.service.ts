import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
    private user: firebase.User;

    constructor(public auth: AngularFireAuth) {
        auth.authState.subscribe(user => {
            this.user = user;
        });
    }

    getUID(){
        if (this.user !== null) return this.user.uid;
    } 

    signup(credentials) {
        return this.auth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
    }

    login(credentials) {
        return this.auth.auth.signInWithEmailAndPassword(
            credentials.email, 
            credentials.password)
    }
}