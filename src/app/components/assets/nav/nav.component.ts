import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../services/local/permission.service';

@Component({
  selector: 'asset-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  constructor(
    private permissionService: PermissionService
  ) {}

  public permissions: string[] = [];

  ngOnInit() {
    this.loadPermissions();
  }

  private loadPermissions() {
    this.permissionService.getPermissionList().subscribe(
      (data: string[]) => {
        this.permissions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  hasPermission(permission: string): boolean {
    if(this.permissions.includes('admin')) {
      return !this.permissionService.adminExcludedPermissions.includes(permission);
    } else if(this.permissions.includes('web_admin')) {
      if(this.permissionService.permissionGroups.get('web_admin') ?? ''.includes(permission)) {
        return true;
      } else {
        return this.permissions.includes(permission);
      }
    } else {
      return this.permissions.includes(permission);
    }
  }
}
