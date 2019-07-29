import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class DiscoverService {
  private apiKey = 'edb14e33dbf6b5a849f1f06b16399595';
  private apiDiscover = `https://api.themoviedb.org/3/discover/tv`
  private results;

  constructor(private http: HttpClient, public loadingCtrl: LoadingController) { }

  public getResults = () => this.results;

  public discover(sort_by = 'popularity.desc') {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading content",
      showBackdrop: false
    })
    loading.present()
    this.http.get(`${this.apiDiscover}?api_key=${this.apiKey}&sort_by=${sort_by}&language=en-US`, { responseType: 'text' })
      .subscribe(response => {
        const responseBody = JSON.parse(response);
        this.results = responseBody.results;
        loading.dismiss();
      }, err => {
        console.log(err);
    }
    );
  }

  public discoverByPage(sort_by = 'popularity.desc', page) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiDiscover}?api_key=${this.apiKey}&sort_by=${sort_by}&page=${page}&language=en-US`, { responseType: 'text' })
        .subscribe(response => {
          const responseBody = JSON.parse(response);
          this.results = this.results.concat(responseBody.results)
          resolve(this.results);
        }, (err) => {
          reject(err);
        });
    });
  }
}
