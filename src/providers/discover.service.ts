import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DiscoverService {
  private apiKey = 'edb14e33dbf6b5a849f1f06b16399595';
  private apiDiscover = `https://api.themoviedb.org/3/discover/tv`
  
  private loaded: boolean;
  private results;

  constructor(private http: HttpClient) { }

  public discover(sort_by = 'popularity.desc') {
    this.http.get(`${this.apiDiscover}?api_key=${this.apiKey}&sort_by=${sort_by}`, { responseType: 'text' })
      .subscribe(response => {
        const responseBody = JSON.parse(response);
        this.results = responseBody.results;
      }, err => {
        console.log(err);
    }
    );
  }

  public getResults = () => this.results;
}
