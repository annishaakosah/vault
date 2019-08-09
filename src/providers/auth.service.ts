import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthService {
    private authState: any = null;

    constructor(public auth: AngularFireAuth) {
        auth.authState.subscribe((auth) => {
            this.authState = auth;
            console.log(this.authState);
        });
    }

    currentUser(): any {
        return this.authenticated() ? this.authState : null;
    }

    currentUID(): string {
        return this.authenticated() ? this.authState.uid : '';
    }

    // Returns true if user is logged in
    authenticated(): boolean {
        return this.authState !== null;
    }

    signup(credentials) {
        return this.auth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
    }

    login(credentials) {
        return this.auth.auth.signInWithEmailAndPassword(
            credentials.email, 
            credentials.password
        )
    }

    logOut(): Promise<void> {
        return this.auth.auth.signOut();
    }
}
