import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchTitleService } from '../../providers/search-title.service';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  title;
  loaded = false;

  constructor(
    private search: SearchTitleService,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    const id = this.navParams.get('id');
    this.title = this.search.getByID(id).then((data) => {
      this.title = data;
      this.loaded = true;
    }, (err) => {
      console.log("something went wrong");
      this.loaded = false;
    });
  }

  ionViewWillLeave() {
    // this.navCtrl.pop()
  }
}
