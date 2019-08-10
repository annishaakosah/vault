import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiscoverService } from '../../providers/discover.service';
import { DetailsPage } from '../details/details';
import { ImdbService } from '../../providers/imdb-app.service';
import { Show } from '../../models/show';

@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {
  results: Show[];
  page = 1;
  sort_by = "popularity.desc";
  showGenres = false;
  genres
  currentGenre = undefined
  scrollerClass = 'scroll'

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
      this.discover.discoverByPage(this.sort_by, this.page, this.currentGenre)
      infiniteScroll.complete();
    }, 1000);
  }

  doRefresh(event) {
    this.page = 1;
    setTimeout(() => {
      this.discover.discoverByGenre(this.currentGenre, this.sort_by)
      event.complete();
    }, 1000);
  }

  public getWithGenre(id) {
    this.currentGenre = id;
    if(id) {
      this.discover.discoverByGenre(id, this.sort_by)
    }
    else {
      this.discover.discover(this.sort_by)
    }
    this.showGenres = false;
    this.scrollerClass = "scroll";
  }

  public getResults() {
    this.results = this.discover.getResults()
    if (this.results) return this.results.filter(t => t.poster_path != null);
  }

  public getGenresList() {
    this.genres = this.discover.getGenresList()
    if (this.genres) {
      return this.genres
    }
  }

  public toggleOptions() {
    this.showGenres = !this.showGenres;
    this.scrollerClass = this.showGenres? "no-scroll" : "scroll"
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
