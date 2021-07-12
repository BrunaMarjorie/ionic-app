import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../inbox/modal.page';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.page.html',
  styleUrls: ['./trash.page.scss'],
})
export class TrashPage implements OnInit {
  trashEmails: Array<{}>;
  constructor(public alertController: AlertController, public modalController: ModalController) {
    this.trashEmails = JSON.parse(localStorage.getItem("trash"));

  }


  ngOnInit() {

  }

  //creating an alert before deleting message permanently
  async removeItem(index) {
    const alert = await this.alertController.create({
      cssClass: 'buttonCss',
      message: 'This message will be deleted <strong>permanently</strong>!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => {
          }
        }, {
          text: 'Continue',
          cssClass: 'confirm-button',
          handler: () => {
            (this.trashEmails).splice(index, 1); //removing item from the array
            localStorage.setItem('trash', JSON.stringify(this.trashEmails)); //updating trash list
          }
        }
      ]
    });

    await alert.present();
  }

  async presentModal(index) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { email: this.trashEmails[index] }
    });
    return await modal.present();
  
  }

}
