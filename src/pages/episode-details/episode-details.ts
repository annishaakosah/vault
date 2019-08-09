import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SearchTitleService } from "../../providers/search-title.service";

/**
 * Generated class for the EpisodeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-episode-details",
  templateUrl: "episode-details.html"
})
export class EpisodeDetailsPage {
  show;
  season;
  episode;
  constructor(
    private search: SearchTitleService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad EpisodeDetailsPage");
    this.show = this.navParams.get("show");
    this.season = this.navParams.get("season");
    this.episode = this.navParams.get("episode");
    console.log(this.episode);
  }

  public getEpisodeStill() {
    let posterPath = this.season.poster_path;
    if (posterPath == null) {
      posterPath = this.season.poster_path;
    }
    return posterPath;
  }
}
