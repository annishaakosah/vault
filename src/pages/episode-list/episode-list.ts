import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchTitleService } from '../../providers/search-title.service';

/**
 * Generated class for the EpisodeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-episode-list',
  templateUrl: 'episode-list.html',
})
export class EpisodeListPage {
  id:number
  show;
  seasons;
  season;
  episodesList;
  seasonNumbers;
  episodes;

  

  constructor(
    private search: SearchTitleService,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.search.getByID(this.id).then((data) => {
      this.show = data;
      // console.log(this.show.seasons[0].season_number);
      // this.getSeason(this.show.seasons[0].season_number);

      // initially get the episodes of the show's first season
      this.getEpisodes(this.show.seasons[0].season_number);
    }, (err) => {
      console.log("something went wrong");
    });
    
  }

   getSeason(seasonNum) {
    // get the season data for the given season number
      this.search.getSeason(this.id, seasonNum).then((data) => {
          this.season = data;
        }, (err) => {
          console.log("something went wrong");
        });
 
  }

 
  getEpisodes(seasonNum) {
    this.getSeason(seasonNum);
    this.episodes = this.season.episodes;
    return this.episodes;
  }


}
