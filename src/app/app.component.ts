import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;

  constructor(private authService: AuthService, private router: Router) {
    // Automatic login
    let profile: any = localStorage.getItem('profile');
    if(profile != null) {
      profile = JSON.parse(profile);
      const user = {
        username: atob(profile.access_token).split(':')[0],
        password: atob(profile.access_token).split(':')[1]
      }
      this.authService.login(user).subscribe(status => {
        if(status) {
          this.authService.setUserProfile(user, true);
          this.router.navigate(['fixture']);
        }
      });
    }
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
  }

  logout() {
    localStorage.removeItem('profile');
    sessionStorage.removeItem('profile'); 
    this.router.navigate(['fixture']);
  }
}

