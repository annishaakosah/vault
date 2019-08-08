import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EpisodeDetailsPage } from './episode-details';

@NgModule({
  declarations: [
    EpisodeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EpisodeDetailsPage),
  ],
})
export class EpisodeDetailsPageModule {}
