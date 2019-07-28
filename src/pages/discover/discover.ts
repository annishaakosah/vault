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

  change_selection(sort_by: string) {
    this.discover.discover(sort_by);
  }

  public getResults() {
    this.results = this.discover.getResults()
    if (this.results) return this.results.filter(t => t.poster_path != null);
  }

  public getDetails(id){
    this.navCtrl.push(DetailsPage, { id: id });
  }
}
