import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SearchTitleService } from "../../providers/search-title.service";
import { EpisodeDetailsPage } from "../episode-details/episode-details";

@IonicPage()
@Component({
  selector: "page-episode-list",
  templateUrl: "episode-list.html"
})
export class EpisodeListPage {
  show;
  seasons = [];
  season;
  seasonNumbers;
  episodes;

  constructor(
    private search: SearchTitleService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.show = this.navParams.get("show");

    // get the season data for the given season number
    for (
      let seasonNum = this.show.seasons[0].season_number;
      seasonNum < this.show.seasons.length;
      seasonNum++
    ) {
      this.search.getSeason(this.show.id, seasonNum).then(
        data => {
          this.seasons.push(data);
        },
        err => {
          console.log("something went wrong");
        }
      );
    }
  }

  getEpisodes(seasonNum) {
    this.season = this.seasons[seasonNum];
    if (this.season) {
      this.episodes = this.season.episodes;
      return this.episodes;
    }
  }

  getEpisodeDetails(show, season, episode) {
    this.navCtrl.push(EpisodeDetailsPage, { show: show, season: season, episode: episode });
  }
}
