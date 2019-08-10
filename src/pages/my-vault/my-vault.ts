
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ImdbService } from '../../providers/imdb-app.service';
import { DetailsPage } from '../details/details';
import { Show } from '../../models/show';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@Component({
  selector: 'page-my-vault',
  templateUrl: 'my-vault.html',
  styles: ['./imdb-app.scss']
})

export class MyVaultPage {
  @ViewChild('slider') slider: Slides;

  watchList: Show[];
  alreadyWatched: Show[];
  selectedList = 'watchList'
  optionsID = undefined;

  constructor(
    private imdbService: ImdbService, 
    private navCtrl: NavController) { 
  }

  selectedTab(list) {
    if(list == "watchList") {
      this.slider.slideTo(1, 500);
    }
    else if(list == "alreadyWatched") {
      this.slider.slideTo(0, 500);
    }
  }

  ionViewDidLoad(){
    this.watchList = this.imdbService.getWatchList();  
    this.alreadyWatched = this.imdbService.getAlreadyWatched();
  }

  ionViewWillLeave(){
    this.optionsID = undefined;
  }

  moveButton(event) {
    let ind = event._snapIndex.toString();
    if(ind == 0) {
      this.selectedList = "alreadyWatched"
    }
    else if (ind == 1) {
      this.selectedList = "watchList"
    }
  }

  swipeEvent(swipe) {
    if(!swipe) {return}

    if(swipe.direction == 2) { //LEFT
      this.optionsID = undefined;
      this.slider.slideTo(1, 500);
      this.selectedList = "watchList"
    }
    else if (swipe.direction == 4) { //RIGHT
      this.optionsID = undefined;
      this.slider.slideTo(0, 500);
      this.selectedList = "alreadyWatched"
    }
  }

  public moveToOtherList(id){
    switch(this.selectedList) {
      case "watchList":
        this.imdbService.addToAlreadyWatched(id, this.watchList[id]);
        this.removeFromWatchList(id)
        break;
      case "alreadyWatched":
        this.imdbService.addToWatchList(id, this.alreadyWatched[id]);
        this.removeFromAlreadyWatched(id)
        break;
      default:
        break;
    }
  }

  public getDetails(id){
    if(this.optionsID) {
      this.optionsID = undefined;
      return;
    }
    this.navCtrl.push(DetailsPage, { id: id, list: this.selectedList });
    this.optionsID = undefined;
  }

  public getWatchListTitles() {
    this.watchList = this.imdbService.getWatchList();
    if(this.watchList) {
      return Object.keys(this.watchList)
    }
  }

  public getAlreadyWatchedTitles() {
    this.alreadyWatched = this.imdbService.getAlreadyWatched();
    if(this.alreadyWatched) {
      return Object.keys(this.alreadyWatched)
    }
  }

  public removeFromWatchList(id) {
    this.imdbService.removeFromWatchList(id);
  }

  public removeFromAlreadyWatched(id) {
    this.imdbService.removeFromAlreadyWatched(id);
  }
}
