import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { mailList } from './inbox.mail.list'; //importing the list of random emails
import { ModalPage } from './modal.page';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  emails: Array<{}>; //initializing the array of emails
  constructor(public modalController: ModalController) {
    //checking if there are emails previouslly saved in the inbox
    let previousInbox = JSON.parse(localStorage.getItem('inbox'));
    if (!previousInbox) {
      previousInbox = [] //if no emails saved, returning an empty array
    } 

    this.emails = previousInbox 
  }

  ngOnInit() {

  }

  removeItem(index) {
    let deletedEmail = this.emails[index]; //assiging the item to be deleted to a new variable
    (this.emails).splice(index, 1); //removing the item from the list
    localStorage.setItem('inbox', JSON.stringify(this.emails)); //setting the new inbox list
    let trash = []; //initializing the trash variable
    //checking if there are emails previouslly saved in the trash box
    let previousTrash = JSON.parse(localStorage.getItem("trash")); 
    if (previousTrash !== null) {
      for (let item of previousTrash) {
        trash.push(item); //creating an array with the trash emails
      }

    }
    trash.push(deletedEmail); //adding the new deleted email to the trash list
    localStorage.setItem('trash', JSON.stringify(trash)); //updating the trash list

  }

  addEmail() {
    //selecting an email randomly
    var newEmail = mailList[Math.floor(Math.random() * mailList.length)];
    (this.emails).push(newEmail); //adding the new email to the inbox list
    let inbox = [];
    //checking if there are emails previouslly saved in the inbox
    let previousInbox = JSON.parse(localStorage.getItem("inbox"));
    if (previousInbox !== null) {
      for (let item of previousInbox) {
        inbox.push(item); //creating an array with the emails
      }

    }
    inbox.push(newEmail); //adding the new email to the inbox list
    localStorage.setItem('inbox', JSON.stringify(inbox)); //updating the inbox list
  }

  async presentModal(index) { //creating a modal to show the email details
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { email: this.emails[index]}
    });
    return await modal.present();
  }

}

