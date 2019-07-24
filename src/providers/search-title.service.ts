import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchTitleService {
  private apiKey = 'edb14e33dbf6b5a849f1f06b16399595';
  private apiSearch = `https://api.themoviedb.org/3/search/tv?api_key=${this.apiKey}`
  private apiFind = `https://api.themoviedb.org/3/tv/`
  
  private validSearch: boolean;
  private notFound: boolean;
  private notProvided: boolean;

  private results;

  constructor(private httpClient: HttpClient) { }

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

  public getByID(id: number) {
    this.httpClient.get(`${this.apiFind}${id}?api_key=${this.apiKey}`, { responseType: 'text' })
      .subscribe(response => {
        const responseBody = JSON.parse(response);
        return responseBody.tv_results
    });
  }

  public isValidSearch = () => this.validSearch;
  public isNotFound = () => this.notFound;
  public isNotProvided = () => this.notProvided;

  public getResults = () => this.results;
}
