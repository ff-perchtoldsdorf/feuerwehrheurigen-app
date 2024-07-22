import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/local/notification.service';
import { LocalNotification } from '../../../dtos/local';

@Component({
  selector: 'overlay-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  constructor(
    private notificationService: NotificationService
  ) { }

  public notifications: LocalNotification[] = [];

  ngOnInit(): void {
    this.handleNotifications();
  }

  handleNotifications() {
    this.notificationService.getNotifications().subscribe(message => {
      this.notifications.push(message);
      this.timeoutNotification(message);
    });
  }

  removeNotification(notification: LocalNotification) {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }

  timeoutNotification(notification: LocalNotification) {
    setTimeout(() => {
      this.removeNotification(notification);
    }, notification.timeout);
  }
}