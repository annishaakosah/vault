import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Show } from "../../models/show";
import { Episode } from "../../models/episode";
import { DetailsPage } from "../details/details";
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: "page-episode-details",
  templateUrl: "episode-details.html"
})
export class EpisodeDetailsPage {
  show: Show;
  season: any;
  episode: Episode;
  episodeProgress: number;
  seasonProgress: number;
  constructor(
    public navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad EpisodeDetailsPage");
    this.show = this.navParams.get("show");
    this.season = this.navParams.get("season");
    this.episode = this.navParams.get("episode");

    let seasProgress =  this.season.season_number/this.show.number_of_seasons * 100;
    if (seasProgress > 100) {
      this.seasonProgress = 100
    } else {
      this.seasonProgress = seasProgress;
    }
    
    this.episodeProgress = this.episode.episode_number/this.season.episode_count * 100;
  }

  public getDetails(id){
    this.navCtrl.setRoot(DetailsPage, {id: id}, {animate: true, direction: 'forward'});
  }

  shareEpisode(episode) {
    let shareShowActionSheet = this.actionSheetController.create({
      title: "Share episode",
      buttons:[
        {
          text: "Facebook",
          handler:()=> {
            this.socialSharing.shareViaFacebook("I just watched \"" + this.show.name + " - " + this.episode.name + "\" #vault", 'https://image.tmdb.org/t/p/original' + this.episode.stillPath);
          }
        },
        {
          text: "Twitter",
          handler:()=> {
            this.socialSharing.shareViaTwitter("I just watched \"" + this.show.name + " - " + this.episode.name + "\" #vault", 'https://image.tmdb.org/t/p/original' + this.episode.stillPath);
          }
        },
        {
          text: "Instagram",
          handler:()=> {
            this.socialSharing.shareViaInstagram("I just watched \"" + this.show.name + " - " + this.episode.name + "\" #vault", 'https://image.tmdb.org/t/p/original' + this.episode.stillPath);
          }
        },
        {
          text: "Cancel",
          role: "destructive"
        }
      ]
    });
    shareShowActionSheet.present();
  }
}
