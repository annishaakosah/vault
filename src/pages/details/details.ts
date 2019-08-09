import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchTitleService } from '../../providers/search-title.service';
import { ImdbService } from '../../providers/imdb-app.service';
import { EpisodeListPage } from '../episode-list/episode-list';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  id:number
  list
  show;

  constructor(
    private search: SearchTitleService,
    private imdbService: ImdbService,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.id = this.navParams.get('id');
    this.list = this.navParams.get('list') || 'watchList'
    this.search.getByID(this.id).then((data) => {
      this.show = data;
    }, (err) => {
      console.log("something went wrong");
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

  public inAlreadyWatched() {
    return this.imdbService.isInAlreadyWatched(this.id);
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

  public getEpisodeList(){
    this.navCtrl.push(EpisodeListPage, { show: this.show });
  }

  public addToWatchList = () => this.imdbService.addToWatchList(this.show.id, this.show.poster_path);

  public addToAlreadyWatchedList = () => this.imdbService.addToAlreadyWatched(this.show.id, this.show.poster_path);

}
