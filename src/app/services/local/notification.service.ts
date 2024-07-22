import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalNotification } from '../../dtos/local';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<LocalNotification>();

  constructor() { }

  sendMessage(notification: LocalNotification) {
    this.notificationSubject.next(notification);
  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }
}
