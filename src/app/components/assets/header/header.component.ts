import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../dtos/auth';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'asset-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  public user: User | null = null;

  environment = environment;

  ngOnInit() {
    this.getUserInformation();
  }

  private getUserInformation() {
    this.authService.userInformation().subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  userMenu(open: boolean) {
    const userMenu = document.getElementById('user-menu');
    if (open) {
      userMenu?.classList.add('show');
    } else {
      userMenu?.classList.remove('show');
    }
  }

  logout() {
    window.location.href = environment.domain.auth + '/logout';
  }

}
