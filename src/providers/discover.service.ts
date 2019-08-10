import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class DiscoverService {
  private apiKey = 'edb14e33dbf6b5a849f1f06b16399595';
  private apiDiscover = `https://api.themoviedb.org/3/discover/tv`
  private apiGenres = `https://api.themoviedb.org/3/genre/tv/list?api_key=${this.apiKey}&language=en-US`
  private results;
  private genres;

  constructor(private http: HttpClient, public loadingCtrl: LoadingController) { }

  public getResults = () => this.results;
  public getGenresList = () => this.genres;

  public getGenres() {
    this.http.get(this.apiGenres, { responseType: 'text' })
    .subscribe(response => {
      const responseBody = JSON.parse(response);

      this.genres = responseBody.genres;
      }, err => {
        console.log(err);
      }
    );
  }

  public discoverByGenre(id: number, sort_by = 'popularity.desc') {
    if(!id) {
      this.discover(sort_by)
      return;
    }

    this.http.get(`${this.apiDiscover}?api_key=${this.apiKey}&sort_by=${sort_by}&with_genres=${id}&language=en-US`, { responseType: 'text' })
      .subscribe(response => {
        const responseBody = JSON.parse(response);
        this.results = responseBody.results;
      }, err => {
        console.log(err);
      }
    );
  }

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

  public discoverByPage(sort_by = 'popularity.desc', page, currentGenre) {
    let url = `${this.apiDiscover}?api_key=${this.apiKey}&sort_by=${sort_by}&page=${page}&language=en-US`
    if(currentGenre) {
      url += `&with_genres=${currentGenre}`
    }
    return new Promise((resolve, reject) => {
      this.http.get(url, { responseType: 'text' })
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
