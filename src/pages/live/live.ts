import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Observable } from 'rxjs/Observable';
import { YtProvider } from '../../providers/yt/yt';
/**
 * Generated class for the LivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-live',
  templateUrl: 'live.html',
})
export class LivePage {

  videos: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private youtube: YoutubeVideoPlayer, private ytProvider: YtProvider) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LivePage');
    this.ytProvider.getLive().subscribe((res) => {
      console.log('res : ', res);
      this.videos = res['items'];
    });
  }

  refresh(){
    this.ytProvider.getLive().subscribe((res) => {
      console.log('res : ', res);
      this.videos = res['items'];
    });
  }

  openVideo(event) {
    this.youtube.openVideo('0x5Mc7sPlpU');
  }

}
