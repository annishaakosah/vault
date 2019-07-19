import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchTitleService {
  private api = 'https://www.omdbapi.com/?apikey=';
  private apiKey = 'abf17045';

  private validSearch: boolean;
  private notFound: boolean;
  private notProvided: boolean;

  private title: string;
  private director: string;
  private plot: string;
  private year: string;
  private imgUrl: string;
  private awards: string;
  private boxOffice: string;
  private runtime: string;
  private imdbRating: string;
  private rottenTomatoesRating: string;
  private metacriticRating: string;
  private type: string;

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
    this.httpClient.get(`${this.api}${this.apiKey}&t=${title}&plot=full`, { responseType: 'text' })
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

          this.title = responseBody.Title;
          this.director = responseBody.Director;
          this.plot = responseBody.Plot;
          this.year = responseBody.Year;
          this.imgUrl = responseBody.Poster;
          this.awards = responseBody.Awards;
          this.boxOffice = responseBody.BoxOffice;
          this.runtime = responseBody.Runtime;
          this.imdbRating = responseBody.Ratings[0].Value;
          this.rottenTomatoesRating = responseBody.Ratings[1] ? responseBody.Ratings[1].Value : '--';
          this.metacriticRating = responseBody.Ratings[2] ? responseBody.Ratings[2].Value : '--';

          this.type = responseBody.Type;
        }
      });
  }

  public isValidSearch = () => this.validSearch;
  public isNotFound = () => this.notFound;
  public isNotProvided = () => this.notProvided;

  public getTitle = () => this.title;
  public getYear = () => this.year;
  public getDirector = () => this.director;
  public getImgUrl = () => this.imgUrl;
  public getPlot = () => this.plot;
  public getAwards = () => this.awards;
  public getBoxOffice = () => this.boxOffice;
  public getRuntime = () => this.runtime;
  public getImdbRating = () => this.imdbRating;
  public getRottenTomatoesRating = () => this.rottenTomatoesRating;
  public getMetacriticRating = () => this.metacriticRating;
  public getType = () => this.type;
}
