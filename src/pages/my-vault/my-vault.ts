

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

  addToAlreadyWatched() {
    this.omdbService.addToAlreadyWatched({
      title: this.getTitle(),
      year: this.getYear(),
      type: this.getType(),
      imgUrl: this.getImgUrl()
    });
  }

  addToWatchList() {
    this.omdbService.addToWatchList({
      title: this.getTitle(),
      year: this.getYear(),
      type: this.getType(),
      imgUrl: this.getImgUrl()
    });
  }

  public isValidSearch = () => this.titleSearch.isValidSearch();
  public isNotFound = () => this.titleSearch.isNotFound();
  public isNotProvided = () => this.titleSearch.isNotProvided();

  public getTitle = () => this.titleSearch.getTitle();
  public getYear = () => this.titleSearch.getYear();
  public getDirector = () => this.titleSearch.getDirector();
  public getImgUrl = () => this.titleSearch.getImgUrl();
  public getPlot = () => this.titleSearch.getPlot();
  public getAwards = () => this.titleSearch.getAwards();
  public getBoxOffice = () => this.titleSearch.getBoxOffice();
  public getRuntime = () => this.titleSearch.getRuntime();
  public getImdbRating = () => this.titleSearch.getImdbRating();
  public getRottenTomatoesRating = () => this.titleSearch.getRottenTomatoesRating();
  public getMetacriticRating = () => this.titleSearch.getMetacriticRating();
  public getType = () => this.titleSearch.getType();
}

