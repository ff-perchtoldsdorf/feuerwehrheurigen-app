import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService
  ) {}

  public now = new Date();

  private clockInterval: any;

  ngOnInit() {
    // clock
    this.clockInterval = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.clockInterval);
  }

  getTime(): string {
    return this.now.getTime().toString();
  }

}
