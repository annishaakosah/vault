import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchTitleService } from '../../providers/search-title.service';
import { ImdbService } from '../../providers/imdb-app.service';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  id:number
  list
  title;
  loaded = false;

  constructor(
    private search: SearchTitleService,
    private imdbService: ImdbService,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.id = this.navParams.get('id');
    this.list = this.navParams.get('list')
    this.search.getByID(this.id).then((data) => {
      this.title = data;
      this.loaded = true;
    }, (err) => {
      console.log("something went wrong");
      this.loaded = false;
    });
  }

  inList(){
    switch(this.list){
      case ("watchList"):
        return this.imdbService.isInWatchList(this.id)
      case "alreadyWatched":
        return this.imdbService.isInAlreadyWatched(this.id)
      default:
        return false
    }
  }

  removeFromWatchList(){
    if(this.list == "alreadyWatched") {
      console.error("You cannot perform this action")
      return
    }
    this.imdbService.removeFromWatchList(this.id)
  }

  removeFromAlreadyWatched(){
    if(this.list == "watchList") {
      console.error("You cannot perform this action")
      return
    }
    this.imdbService.removeFromAlreadyWatched(this.id)
  }
}
