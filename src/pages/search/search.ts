

import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { ImdbService } from '../../providers/imdb-app.service';
import { SearchTitleService } from '../../providers/search-title.service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  styles: ['./imdb-app.scss']
})
export class SearchPage {

  constructor(private imdbService: ImdbService,
    private titleSearch: SearchTitleService,
    private alertController: AlertController) {
  }

  search(title: string) {
    this.titleSearch.searchTitle(title);
  }

  addToAlreadyWatched(title) {
    this.imdbService.addToAlreadyWatched(title.id);
  }

  addToWatchList(title) {
    this.imdbService.addToWatchList(title.id);
  }

  inWatchList(title) {  
    this.imdbService.getWatchList().includes(title.id)
  }

  public isValidSearch = () => this.titleSearch.isValidSearch();
  public isNotFound = () => this.titleSearch.isNotFound();
  public isNotProvided = () => this.titleSearch.isNotProvided();

  public getImgUrl(title){
    `https://image.tmdb.org/t/p/original${title.poster_path}`
  }

  public getResults() {
    let results = this.titleSearch.getResults()
    if (results) return results.filter(t => t.poster_path != null);
  }
}

