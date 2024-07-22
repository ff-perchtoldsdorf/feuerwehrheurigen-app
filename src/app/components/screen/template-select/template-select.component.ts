import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../services/local/permission.service';
import { Router } from '@angular/router';
import { ScreenTemplateLight } from '../../../dtos/screen';
import { ScreenService } from '../../../services/screen.service';

@Component({
  selector: 'app-template-select',
  templateUrl: './template-select.component.html',
  styleUrl: './template-select.component.scss'
})
export class TemplateSelectComponent implements OnInit {

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private screenService: ScreenService,
  ) {}

  public hasPermission: boolean = false;

  public screenTemplates: ScreenTemplateLight[] = [];

  ngOnInit() {
    this.loadPermissions();
  }

  private loadPermissions() {
    this.permissionService.hasPermission('esm').subscribe(
      (data: boolean) => {
        this.hasPermission = data;
        console.log(data);

        if(!data) {
          this.router.navigate(['/']);
        } else {
          this.loadData();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private loadData() {
    this.screenService.getTemplateList().subscribe(
      (data: ScreenTemplateLight[]) => {
        this.screenTemplates = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
