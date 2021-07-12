import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../inbox/modal.page';

@Component({
  selector: 'app-spam',
  templateUrl: './spam.page.html',
  styleUrls: ['./spam.page.scss'],
})
export class SpamPage implements OnInit {
  spam: Array<{}>;
  constructor(public modalController: ModalController) { 
    let previousSpam = JSON.parse(localStorage.getItem('spam'));
    if (!previousSpam) {
      previousSpam = [{ title: "Spam 1", email: "email@email.com", content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore nobis atque reiciendis assumenda illo corrupti rerum sit, libero error modi culpa architecto ducimus illum fugiat animi ex eos minus repudiandae." },
      { title: "Spam 2", email: "anotheremail@email.com", content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore nobis atque reiciendis assumenda illo corrupti rerum sit, libero error modi culpa architecto ducimus illum fugiat animi ex eos minus repudiandae." },
      { title: "Spam 3", email: "onemoreemail@email.com", content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore nobis atque reiciendis assumenda illo corrupti rerum sit, libero error modi culpa architecto ducimus illum fugiat animi ex eos minus repudiandae." },
      { title: "Spam 4", email: "enoughemail@email.com", content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore nobis atque reiciendis assumenda illo corrupti rerum sit, libero error modi culpa architecto ducimus illum fugiat animi ex eos minus repudiandae." }
       
    ]

      localStorage.setItem('spam', JSON.stringify(previousSpam));

    }

    this.spam = previousSpam;
  }

  ngOnInit() {
  }

  removeItem(index) {
    let deletedEmail = this.spam[index];
    (this.spam).splice(index, 1);
    localStorage.setItem('spam', JSON.stringify(this.spam));
    let trash = [];
    let previousTrash = JSON.parse(localStorage.getItem("trash"));
    if (previousTrash !== null) {
      for(let item of previousTrash){
        trash.push(item);
      }
      
    }
    trash.push(deletedEmail);
    localStorage.setItem('trash', JSON.stringify(trash));
  }

  async presentModal(index) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { email: this.spam[index]}
    });
    return await modal.present();
  }
}
