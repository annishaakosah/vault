import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { SearchTitleService } from '../../providers/search-title.service';
import { ImdbService } from '../../providers/imdb-app.service';
import { EpisodeListPage } from '../episode-list/episode-list';
import { Show } from '../../models/show';
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  id: number;
  list: string;
  show: Show;

  constructor(
    private search: SearchTitleService,
    private imdbService: ImdbService,
    public navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.navCtrl.swipeBackEnabled = true;
    this.id = this.navParams.get('id');
    this.list = this.navParams.get('list') || 'watchList'
    this.search.getByID(this.id).then((data) => {
      this.show = data;
    }, (err) => {
      console.log("something went wrong");
    });
  }

  public inWatchList() {
    return this.imdbService.isInWatchList(this.id);
  }

  public inAlreadyWatched() {
    return this.imdbService.isInAlreadyWatched(this.id);
  }

  removeFromWatchList(){
    this.imdbService.removeFromWatchList(this.id)
  }

  removeFromAlreadyWatched(){
    this.imdbService.removeFromAlreadyWatched(this.id)
  }

  public getEpisodeList(){
    this.navCtrl.push(EpisodeListPage, { show: this.show });
  }

  public addToWatchList = () => this.imdbService.addToWatchList(this.show.id, this.show.poster_path);

  public addToAlreadyWatchedList = () => this.imdbService.addToAlreadyWatched(this.show.id, this.show.poster_path);


  shareShow(show) {
    let shareShowActionSheet = this.actionSheetController.create({
      title: "Share show",
      buttons:[
        {
          text: "Facebook",
          handler:()=> {
            this.socialSharing.shareViaFacebook("Check out \"" + show.name + "\" I just discovered using #vault", 'https://image.tmdb.org/t/p/original' + show.poster_path);
          }
        },
        {
          text: "Twitter",
          handler:()=> {
            this.socialSharing.shareViaTwitter("Check out \"" + show.name + "\" I just discovered using #vault", 'https://image.tmdb.org/t/p/original' + show.poster_path);
          }
        },
        {
          text: "Instagram",
          handler:()=> {
            this.socialSharing.shareViaInstagram("Check out \"" + show.name + "\" I just discovered using #vault", 'https://image.tmdb.org/t/p/original' + show.poster_path);
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
