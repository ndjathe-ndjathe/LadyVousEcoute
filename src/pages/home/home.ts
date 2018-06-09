import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';

import { MagazinePage } from '../magazine/magazine';
import { VideosPage } from '../videos/videos';
import { LivePage } from '../live/live';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openPage(page) {

    switch (page){
      case 'videos':
        this.navCtrl.setRoot(VideosPage);
        break;
      case 'live':
        this.navCtrl.setRoot(LivePage);
        break;
      case 'magazine':
        this.navCtrl.setRoot(MagazinePage);
        break;
      default:
        this.navCtrl.setRoot(VideosPage);
    }
  }

}
