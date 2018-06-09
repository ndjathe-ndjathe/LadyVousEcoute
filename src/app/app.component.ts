import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MagazinePage } from '../pages/magazine/magazine';
import { VideosPage } from '../pages/videos/videos';
import { LivePage } from '../pages/live/live';
import { YtProvider } from '../providers/yt/yt';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  videos: any;
  pages: Array<{title: string, component: any, icon: string, badge: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private ytProvider: YtProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home', badge: '' },
      { title: 'Videos', component: VideosPage, icon: 'logo-youtube', badge: '' },
      { title: 'Live', component: LivePage, icon: 'play', badge: '' },
      { title: 'Magazine', component: MagazinePage, icon: 'paper', badge: '' },
    ];

    this.ytProvider.getNumberVideos().subscribe((res) => {
      console.log('res : ', res);
      this.videos = res;
      if(this.videos.pageInfo.totalResults < this.videos.pageInfo.resultsPerPage){
        this.pages[1].badge = this.videos.pageInfo.totalResults;
      }
      else{
        this.pages[1].badge = "50+";
      }
    });

    this.ytProvider.getLive().subscribe((res) => {
      console.log('res : ', res);
      this.videos = res;
      this.pages[2].badge = this.videos.pageInfo.totalResults;
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
    this.ytProvider.getNumberVideos().subscribe((res) => {
      console.log('res : ', res);
      this.videos = res;
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
