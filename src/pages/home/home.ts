import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ContactPage } from '../contact/contact';


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
  loader: any;
  constructor(public navCtrl: NavController, private httpClient: HttpClient, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.getNews();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 2000,
      dismissOnPageChange: true
    });
    this.loader.present();
  }

  dismissLoader() {
    this.loader.dismiss();
  }

  openModal() {
    const myModal = this.modalCtrl.create(ContactPage);
    myModal.present();
  }

  getNews() {
    this.presentLoading();
    this.httpClient.get<INews>('http://newsapi.org/v2/top-headlines?country=au&category=business&apiKey=364a811e3dfc495b9cdfb4f4a3e70112').
      subscribe(data => {
        this.news = data.articles;
        this.dismissLoader();
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured');
          }
          else {
            console.log('Server-side error occured');
          }
          this.dismissLoader();
        }
      );
  }

  getNewsbyFilter(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.news = this.news.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      return this.getNews();
    }
  }
}
