import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyVaultPage } from '../my-vault/my-vault';
import { SearchPage } from '../search/search';
import { DiscoverPage } from '../discover/discover';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = MyVaultPage;
  tab2Root = DiscoverPage;
  tab3Root = SearchPage;
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myIndex = navParams.get('tabIndex') || 0;
  }

}
