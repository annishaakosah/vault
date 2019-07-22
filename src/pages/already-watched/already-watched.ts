import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';

import { ImdbService } from '../../providers/imdb-app.service';

@Component({
  selector: 'already-watched',
  templateUrl: './already-watched.html',
  styles: ['./already-watched.scss']
})
export class AlreadyWatched {
  isFoo = false;
  constructor(private imdbService: ImdbService, private alertController: AlertController) { }

  getTitles() {
    return JSON.parse(localStorage.getItem('alreadyWatched'));
  }

  removeTitleFromAlreadyWatched(title: string) {
    const alert = this.alertController.create({
      subTitle: `You're about to delete "${title}" from your Already Watched list. Continue?`,
      buttons: [
        {
            text: 'Yes',
            handler: () => {
              // this.imdbService.removeFromAlreadyWatched(title);
            }
        },
        {
            text: 'Cancel',
            handler: () => {
              // do nothing
            }
        }
      ]
    });
    alert.present();
  }

  toggleFoo() { 
    this.isFoo = !this.isFoo;
  }
}

