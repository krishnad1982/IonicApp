import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }
  openModal() {
    const myModal = this.modalCtrl.create(ContactPage);
    myModal.present();
  }
}
