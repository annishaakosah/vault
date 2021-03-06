import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Show } from '../models/show';

@Injectable()
export class SearchTitleService {
  private apiKey = 'edb14e33dbf6b5a849f1f06b16399595';
  private apiSearch = `https://api.themoviedb.org/3/search/tv?api_key=${this.apiKey}`
  private apiFind = `https://api.themoviedb.org/3/tv/`

  private validSearch: boolean;
  private notFound: boolean;
  private notProvided: boolean;

  private results: Show[];

  constructor(private httpClient: HttpClient) { }

  public reset(){
    this.results = [];
  }

  public searchTitle(title: string): void {
    if (!title) {
      this.validSearch = false;
      this.notProvided = true;
      this.notFound = false;
    } else {
      this.getValidSearchResults(title);
    }
  }

  private getValidSearchResults(title: string) {
    this.httpClient.get(`${this.apiSearch}&language=en-US&query=${title}`, { responseType: 'text' })
      .subscribe(response => {
        const responseBody = JSON.parse(response);

        if (responseBody.Error) {
          this.validSearch = false;
          this.notFound = true;
          this.notProvided = false;
        } else {
          this.validSearch = true;
          this.notFound = false;
          this.notProvided = false;

          this.results = responseBody.results;
        }
      });
  }

  public searchByPage(title: string, page) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(`${this.apiSearch}&page=${page}&language=en-US&query=${title}`, { responseType: 'text' })
        .subscribe(response => {
          const responseBody = JSON.parse(response);
          this.results = this.results.concat(responseBody.results)
          resolve(this.results);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getByID(id: number): Promise<Show> {
    return new Promise<Show>((resolve, reject) => {
      this.httpClient.get(`${this.apiFind}${id}?api_key=${this.apiKey}`, { responseType: 'text' })
        .subscribe(response => {
          resolve(JSON.parse(response));
        }, (err) => {
          reject(err);
        });
    });
  }

  public getSeason(id: number, season: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(`${this.apiFind}${id}/season/${season}?api_key=${this.apiKey}`, { responseType: 'text' })
        .subscribe(response => {
          resolve(JSON.parse(response));
        }, (err) => {
          reject(err);
        });
    });
  }
  
  public isValidSearch = () => this.validSearch;
  public isNotFound = () => this.notFound;
  public isNotProvided = () => this.notProvided;
  public getResults = () => this.results;
}
