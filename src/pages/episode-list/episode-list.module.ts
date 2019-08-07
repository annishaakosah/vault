import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EpisodeListPage } from './episode-list';

@NgModule({
  declarations: [
    EpisodeListPage,
  ],
  imports: [
    IonicPageModule.forChild(EpisodeListPage),
  ],
})
export class EpisodeListPageModule {}
