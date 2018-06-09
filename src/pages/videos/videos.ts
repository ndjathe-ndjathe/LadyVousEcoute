import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Modal, ModalController, ModalOptions } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { YtProvider } from '../../providers/yt/yt';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

/**
 * Generated class for the VideosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  channelId = 'UCZZPgUIorPao48a1tBYSDgg'; // Devdactic Channel ID
  playlists: Observable<any[]>;
  videos: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ytProvider: YtProvider, private alertCtrl: AlertController, private modal: ModalController, private youtube: YoutubeVideoPlayer) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
    this.ytProvider.getVideos(1).subscribe((res) => {
      console.log('res : ', res);
      this.videos = res['items'];
    });
  }

  refresh(event){
    this.ytProvider.getVideos(1).subscribe((res) => {
      console.log('res : ', res);
      this.videos = res['items'];
    });
  }

  searchPlaylists(event) {
    this.playlists = this.ytProvider.getPlaylistsForChannel(this.channelId);
    this.playlists.subscribe(data => {
      console.log('playlists: ', data);
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Playlists found for that Channel ID',
        buttons: ['OK']
      });
      alert.present();
    })
  }

  openPlaylist(id) {
    this.navCtrl.push('PlaylistPage', {id: id});
  }

  openVideo(event, videoId) {
    this.youtube.openVideo(videoId);
  }

  openModal(video) {

    console.log('video : ', video);

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = video;

    const myModal: Modal = this.modal.create('DescriptionPage', { data: myModalData }, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      console.log(data);
    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });

  }

}
