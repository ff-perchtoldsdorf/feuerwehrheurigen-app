import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { PermissionService } from './services/local/permission.service';
import { MatIconRegistry } from '@angular/material/icon';
import { Permissions, Session } from './dtos/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private permissionService: PermissionService,
    private matIconRegistry: MatIconRegistry
  ) {}

  public isLoggedIn: boolean = false;
  public permissionLoaded: boolean = false;

  ngOnInit() {
    // console.log(environment);
    this.authService.session().subscribe(
      (session: Session) => {
        if(!session.loggedIn) {
          window.location.href = environment.domain.auth + 'login?redirect=event';
        } else {
          this.loadCss();
          this.loadPermissions();
          this.isLoggedIn = true;
          this.helloMessage();
        }
      }
    );
  }

  helloMessage() {
    const style = {
      title: 'font-family: monospace; font-size: 30px; font-weight: 600;',
      text: 'font-family: monospace; font-size: 15px; font-weight: 200;',
      disclaimer: 'font-family: monospace; font-size: 10px; font-weight: 100;'
    };
    
    console.log(
      '%c\n🔥🔥FF Perchtoldsdorf - Veranstaltungen🎉🎉\n\n' +
      '%cWillkommen im Veranstaltungsbereich der FF Perchtoldsdorf! 👩‍🚒👨‍🚒\n\n\n' +
      '%cby JPromi' +
      '\n\n\n\n\n',
      style.title, style.text, style.disclaimer
    );
  }

  loadCss() {
    const head = document.getElementsByTagName('head')[0];

    // Poppins
    const poppins = document.createElement('link');
    poppins.rel = 'stylesheet';
    poppins.type = 'text/css';
    poppins.href = environment.domain.api + 'lt/google/fonts/Poppins';
    head.appendChild(poppins);

    // google Icons
    const googleIcons = document.createElement('link');
    googleIcons.rel = 'stylesheet';
    googleIcons.type = 'text/css';
    googleIcons.href = environment.domain.api + 'lt/google/icons?family=Material+Symbols+Outlined';
    head.appendChild(googleIcons);
    this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }

  loadPermissions() {
    this.authService.hasPermissions().subscribe(
      (permission) => {
        this.permissionService.setPermissions(permission.hasPermissions);
        this.permissionLoaded = true;
      }
    );
  }
}
