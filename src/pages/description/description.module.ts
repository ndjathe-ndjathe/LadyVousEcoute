import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriptionPage } from './description';

@NgModule({
  declarations: [
    DescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(DescriptionPage),
  ],
  exports: [
    DescriptionPage
  ]
})
export class DescriptionPageModule {}
