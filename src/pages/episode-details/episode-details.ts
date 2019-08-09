import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Show } from "../../models/show";
import { Episode } from "../../models/episode";
import { DetailsPage } from "../details/details";

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
  show: Show;
  season: any;
  episode: Episode;
  constructor(
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

  public getDetails(id){
    this.navCtrl.setRoot(DetailsPage, {id: id}, {animate: true, direction: 'forward'});

  
  }

}
