import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiscoverService } from '../../providers/discover.service';
import { DetailsPage } from '../details/details';
import { ImdbService } from '../../providers/imdb-app.service';

@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {
  results;
  page = 1;
  sort_by = "popularity.desc";
  showGenres = false;
  genres

  constructor(
    private discover: DiscoverService,
    private imdbService: ImdbService,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.discover.discover();
    this.discover.getGenres();
  }

  change_selection() {
    this.page = 1
    this.discover.discover(this.sort_by);
  }

  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    
    setTimeout(() => {
      this.discover.discoverByPage(this.sort_by, this.page)
      infiniteScroll.complete();
    }, 1000);
  }

  public getResults() {
    this.results = this.discover.getResults()
    if (this.results) return this.results.filter(t => t.poster_path != null);
  }

  public getGenresList() {
    this.genres = this.discover.getGenresList()
    if (this.genres) {
      this.showGenres = true;
      return this.genres
    }
  }

  public getDetails(id: number){
    this.navCtrl.push(DetailsPage, { id: id });
  }

  public inWatchList(id: number) {
    return this.imdbService.isInWatchList(id);
  }

  public addToWatchList(title) {
    this.imdbService.addToWatchList(title.id, title.poster_path)
  }

  public removeFromWatchList(id: number) {
    this.imdbService.removeFromWatchList(id)
  }
}
