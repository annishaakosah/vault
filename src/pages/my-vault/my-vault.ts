

import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { OmdbService } from '../../providers/omdb-app.service';
import { SearchTitleService } from '../../providers/search-title.service';

@Component({
  selector: 'page-my-vault',
  templateUrl: 'my-vault.html',
  styles: ['./omdb-app.scss']
})
export class MyVaultPage {

  constructor(private omdbService: OmdbService,
    private titleSearch: SearchTitleService,
    private alertController: AlertController) {
  }

  search(title: string) {
    this.titleSearch.searchTitle(title);
  }

  // addToAlreadyWatched(title) {
  //   this.omdbService.addToAlreadyWatched(title.id);
  // }

  // addToWatchList(title) {
  //   this.omdbService.addToWatchList(title.id);
  // }

  public isValidSearch = () => this.titleSearch.isValidSearch();
  public isNotFound = () => this.titleSearch.isNotFound();
  public isNotProvided = () => this.titleSearch.isNotProvided();

  public getImgUrl(title){
    `https://image.tmdb.org/t/p/original${title.poster_path}`
  }

  public getResults = () => this.titleSearch.getResults();
}

