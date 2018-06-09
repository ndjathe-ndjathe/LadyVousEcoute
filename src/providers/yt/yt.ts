import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the YtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YtProvider {

  apiKey = 'AIzaSyAerIxAUhQ_-OH-nZA7XPiPAbJs0YGppE8';
  channelId = 'UCLMWYpst_K1rM-LmgbefC8A';

  constructor(public http: HttpClient) {
    console.log('Hello YtProvider Provider');
  }

  getPlaylistsForChannel(channel) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet,id&maxResults=20')
      .map((res) => {
        console.log('res : ', res);
        return res['items'];
      })
  }

  getListVideos(listId) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId +'&part=snippet,id&maxResults=20')
      .map((res) => {
        console.log('res : ', res);
        return res['items'];
      })
  }

  getVideos(index) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + this.channelId +'&part=snippet,id&type=video&maxResults=20&order=date');
  }

  getNumberVideos() {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + this.channelId +'&part=id&type=video&maxResults=49&order=date');
  }

  getLive() {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + this.channelId +'&eventType=live&part=snippet,id&type=video&maxResults=20&order=date');
  }
}
