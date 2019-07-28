import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ImdbService } from '../../providers/imdb-app.service';
import { DiscoverService } from '../../providers/discover.service';
import { DetailsPage } from '../details/details';

@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {
  results;
  page = 1;
  sort_by = "popularity.desc";

  constructor(
    private imdbService: ImdbService,
    private discover: DiscoverService,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.discover.discover();
  }

  change_selection() {
    this.page = 1
    this.discover.discover(this.sort_by);
  }

  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    
    setTimeout(() => {
      this.results = this.discover.discoverByPage(this.sort_by, this.page).then((data) => {
        this.results = data
      }, (err) => {
        console.log("something went wrong");
      });
      infiniteScroll.complete();
    }, 1000);
  }

  public getResults() {
    this.results = this.discover.getResults()
    if (this.results) return this.results.filter(t => t.poster_path != null);
  }

  public getDetails(id){
    this.navCtrl.push(DetailsPage, { id: id });
  }
}
