import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-page',
  templateUrl: './modal.page.view.html',
})
export class ModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit(){}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}