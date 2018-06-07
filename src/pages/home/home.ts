import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AboutPage } from '../about/about';


interface INews {
  articles: any
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  serachQuery: string = '';
  news: any;
  constructor(public navCtrl: NavController, private httpClient: HttpClient, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.getNews();
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 2000,
      dismissOnPageChange: true
    });
    loader.present();
  }

  openModal() {
    const myModal = this.modalCtrl.create(AboutPage);
    myModal.present();
  }

  getNews() {
    this.httpClient.get<INews>('http://newsapi.org/v2/top-headlines?country=au&category=business&apiKey=364a811e3dfc495b9cdfb4f4a3e70112').
      subscribe(data => {
        this.presentLoading();
        this.news = data.articles;
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured');
          }
          else {
            console.log('Server-side error occured');
          }
        }
      );
  }

  getNewsbyFilter(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.news = this.news.filter((item) => {
        return (item.toLowercase().indexOf(val.toLowercase()) > -1);
      })
    }
  }
}
