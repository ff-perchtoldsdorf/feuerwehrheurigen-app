import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Permissions, Session, User } from '../dtos/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public httpClient: HttpClient,
    private route: Router
  ) { }

  private _url = environment.domain.api + 'internal/auth';

  session(): Observable<Session> {
    return this.httpClient.get<Session>(this._url + '/session', { withCredentials: true })
  }

  hasPermissions(): Observable<Permissions> {
    return this.httpClient.get<Permissions>(this._url + '/permission', { withCredentials: true })
  }

  hasSpecificPermission(permission: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this._url + '/permission?type=' + permission, { withCredentials: true })
  }

  userInformation(): Observable<User> {
    return this.httpClient.get<User>(this._url + '/user', { withCredentials: true })
  }

  notLoggedIn() {
    this.route.navigateByUrl('/');
  }
}
