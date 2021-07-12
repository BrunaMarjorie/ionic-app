import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: 'inbox', icon: 'mail' },
    { title: 'Trash', url: 'trash', icon: 'trash' },
    { title: 'Spam', url: 'spam', icon: 'warning' },
  ];
  
  constructor() {}
}
