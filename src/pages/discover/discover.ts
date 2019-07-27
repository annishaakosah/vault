import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ImdbService } from '../../providers/imdb-app.service';
import { DiscoverService } from '../../providers/discover.service';

@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {

  constructor(
    private imdbService: ImdbService,
    private discover: DiscoverService,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.discover.discover();    
  }

  public getResults() {
    let results = this.discover.getResults()
    if (results) return results.filter(t => t.poster_path != null);
  }
}
