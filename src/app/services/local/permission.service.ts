import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() { }

  private permissions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public permissionGroups = new Map<string, string[]>(
    [
      ['web_admin', ["operation", "web_admin", "ffj", "news"]]
    ]
  );

  public adminExcludedPermissions = ["pre_writer"];

  getPermissionList(): Observable<string[]> {
    return this.permissions.asObservable();
  }
  hasPermission(permission: string): Observable<boolean> {
    // admin
    if (this.permissions.value.includes('admin')) {
      if(this.adminExcludedPermissions.includes(permission)) {
        return new Observable<boolean>(observer => {
          observer.next(false);
        });
      } else {
        return new Observable<boolean>(observer => {
          observer.next(true);
        });
      }
    }
    
    // group
    for (let [key, value] of this.permissionGroups) {
      if (value.includes(permission)) {
        return this.permissions.pipe(map((permissions: string[]) => permissions.includes(key)));
      }
    }
    
    return this.permissions.pipe(map((permissions: string[]) => permissions.includes(permission)));
  }

  setPermissions(permissions: string[]) {
    this.permissions.next(permissions);
  }
}
