import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ImdbService } from '../../providers/imdb-app.service';
import { SearchTitleService } from '../../providers/search-title.service';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  styles: ['./imdb-app.scss']
})
export class SearchPage {
  page = 1
  query: string

  constructor(private imdbService: ImdbService,
    private titleSearch: SearchTitleService,
    private navCtrl: NavController) {
  }

  search(title: string) {
    this.page = 1
    this.query = title;
    this.titleSearch.searchTitle(title);
  }

  addToWatchList(title) {
    this.imdbService.addToWatchList(title.id, title.poster_path);
  }

  removeFromWatchList(id: number) {
    this.imdbService.removeFromWatchList(id);
  }

  inWatchList(id) {
    return this.imdbService.isInWatchList(id);
  }

  public getDetails(title){
    this.navCtrl.push(DetailsPage, { id: title.id });
  }

  public isValidSearch = () => this.titleSearch.isValidSearch();
  public isNotFound = () => this.titleSearch.isNotFound();
  public isNotProvided = () => this.titleSearch.isNotProvided();

  public getImgUrl(title){
    `https://image.tmdb.org/t/p/original${title.poster_path}`
  }

  public getResults() {
    let results = this.titleSearch.getResults()
    if (results) return results.filter(t => t.poster_path != null);
  }

  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    
    setTimeout(() => {
      this.titleSearch.searchByPage(this.query, this.page)
      infiniteScroll.complete();
    }, 1000);
  }
}
