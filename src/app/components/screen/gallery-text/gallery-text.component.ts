import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../services/local/permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenService } from '../../../services/screen.service';
import { ScreenTemplate, ScreenTemplateGalleryImage } from '../../../dtos/screen';
import { NotificationService } from '../../../services/local/notification.service';
import { LocalNotification } from '../../../dtos/local';

@Component({
  selector: 'app-gallery-text',
  templateUrl: './gallery-text.component.html',
  styleUrl: './gallery-text.component.scss'
})
export class GalleryTextComponent implements OnInit {

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private screenService: ScreenService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  public hasPermission: boolean = false;

  public template: ScreenTemplate | null = null;
  public selectedImage: ScreenTemplateGalleryImage | null = null;
  public images: string[] = [];

  ngOnInit() {
    this.loadPermissions();
  }

  selectImage(image: ScreenTemplateGalleryImage | null) {
    if(image == this.selectedImage) {
      this.selectedImage = null;
      return;
    } else {
      this.selectedImage = image;
    }
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
    var templateUuid = this.activeRoute.snapshot.params['uuid'] ?? '';

    if(templateUuid) {
      this.screenService.getTemplate(templateUuid).subscribe(
        (data: ScreenTemplate) => {
          this.template = data;
          this.stripGallery();
        },
        (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }

  private stripGallery() {
    if(this.template) {
      var images: string[] = [];

      this.template.settings.gallery.images.forEach((image: ScreenTemplateGalleryImage) => {
        if(!images.includes(image.image)) {
          var http = image.image.substring(0, 4);
          if(http == 'http') {
            images.push(image.image);
          }
        }
      });

      this.images = images;
    }
  }

  selectSelectedImageImage(image: string) {
    if(this.selectedImage) {
      this.selectedImage.image = image;
    }
  }

  addNewImage() {
    if(this.template) {
      var index = this.template.settings.gallery.images.length;
      var firstImage = this.template.settings.gallery.images[0].image;
      this.template.settings.gallery.images.push(new ScreenTemplateGalleryImage('', index, firstImage, '', false));
      this.stripGallery();
      this.selectImage(this.template.settings.gallery.images[this.template.settings.gallery.images.length - 1]);
    }
  }

  saveTemplate() {
    if(this.template) {
      this.screenService.saveTemplate(this.template).subscribe(
        (data: boolean) => {
          if(data) {
            var message = new LocalNotification("Template Gespeichert", "Das Template wurde erfolgreich gespeichert.", "success");
            this.notificationService.sendMessage(message);
            this.loadData();
          } else {
            var message = new LocalNotification("Error", "Template konnte nicht gespeichert werden.", "error");
            this.notificationService.sendMessage(message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
