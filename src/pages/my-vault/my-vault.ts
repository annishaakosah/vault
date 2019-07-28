
import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ImdbService } from '../../providers/imdb-app.service';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-my-vault',
  templateUrl: 'my-vault.html',
  styles: ['./imdb-app.scss']
})

export class MyVaultPage {
  watchList;
  alreadyWatched;
  selectedList = 'watchList'
  titles;

  constructor(
    private imdbService: ImdbService, 
    private navCtrl: NavController) { 
  }

  ionViewDidLoad(){
    this.watchList = this.imdbService.getWatchList();  
    this.alreadyWatched = this.imdbService.getAlreadyWatched();
  }

  public getTitles(){
    switch(this.selectedList) {
      case "watchList":
        this.titles = this.getWatchListTitles()
        break;
      case "alreadyWatched":
        this.titles = this.getAlreadyWatchedTitles();
        break;
      default:
        this.titles = this.getWatchListTitles()
        break;
    }
    return this.titles
  }

  public removeFromList(id){
    switch(this.selectedList) {
      case "watchList":
        this.removeFromWatchList(id)
        this.titles = this.getWatchListTitles();
        break;
      case "alreadyWatched":
        this.removeFromAlreadyWatched(id)
        this.titles = this.getAlreadyWatchedTitles();
        break;
      default:
        break;
    }
  }

  public getDetails(id){
    this.navCtrl.push(DetailsPage, { id: id });
  }

  public getImageUrl(id){
    switch(this.selectedList){
      case "watchList":
        return `https://image.tmdb.org/t/p/w500${this.watchList[id]}`
      case "alreadyWatched":
        return `https://image.tmdb.org/t/p/w500${this.alreadyWatched[id]}`
      default:
        break;
    }
  }

  private getWatchListTitles() {
    this.watchList = this.imdbService.getWatchList();
    if(this.watchList) {
      return Object.keys(this.watchList)
    }
  }

  private getAlreadyWatchedTitles() {
    this.alreadyWatched = this.imdbService.getAlreadyWatched();
    if(this.alreadyWatched) {
      return Object.keys(this.alreadyWatched)
    }
  }

  private removeFromWatchList(id) {
    this.imdbService.removeFromWatchList(id);
  }

  private removeFromAlreadyWatched(id) {
    this.imdbService.removeFromAlreadyWatched(id);
  }
}

