import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyVaultPage } from './my-vault';

@NgModule({
  declarations: [
    MyVaultPage,
  ],
  imports: [
    IonicPageModule.forChild(MyVaultPage),
  ],
  exports: [
    MyVaultPage
  ]
})
export class MyVaultPageModule {}
