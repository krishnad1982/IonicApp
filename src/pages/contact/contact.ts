import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  closeModal() {
    this.viewCtrl.dismiss();
    //this.navCtrl.setRoot(HomePage);
  }

  submitPage(){
    this.navCtrl.setRoot(HomePage);
    // this.navCtrl.push(HomePage);
  }
}
