
import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

import { ImdbService } from '../../providers/imdb-app.service';
import { SearchTitleService } from '../../providers/search-title.service';
import { User } from '../../models/user';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-my-vault',
  templateUrl: 'my-vault.html',
  styles: ['./imdb-app.scss']
})

export class MyVaultPage {
  isFoo = false;
  watchList;
  alreadyWatched;

  constructor(
    private imdbService: ImdbService, 
    private alertController: AlertController,
    private navCtrl: NavController,
    private search: SearchTitleService) { 
  }

  getWatchListTitles() {
    this.watchList = this.imdbService.getWatchList();
    if(this.watchList) {
      return Object.keys(this.watchList)
    }
  }

  getAlreadyWatchedTitles() {
    this.alreadyWatched = this.imdbService.getAlreadyWatched();
    if(this.alreadyWatched) {
      return Object.keys(this.alreadyWatched)
    }
  }

  removeFromWatchList(id) {
    this.imdbService.removeFromWatchList(id);
  }

  removeFromAlreadyWatched(id) {
    this.imdbService.removeFromAlreadyWatched(id);
  }

  public getDetails(id){
    this.navCtrl.push(DetailsPage, { id: id });
  }

  toggleFoo() { 
    this.isFoo = !this.isFoo;
  }
}

