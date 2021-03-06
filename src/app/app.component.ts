import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  isLoggedIn: boolean;
  username: string;
  role: string;
  loginSubscription: any;

  constructor(private authService: AuthService, private router: Router) {
    // Automatic login
    let profile: any = localStorage.getItem('profile');
    if(profile != null) {
      profile = JSON.parse(profile);
      const user = {
        username: atob(profile.access_token).split(':')[0],
        password: atob(profile.access_token).split(':')[1]
      }
      this.authService.login(user).subscribe(data => {
        if(data.role) {
          this.authService.setUserProfile(user, true, data.role);
          this.router.navigate(['fixture']);
        }
      });
    }

    this.loginSubscription = this.authService.loginSubscription.subscribe(loggedIn => {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.username = this.authService.getUsername();
      this.role = this.authService.getUserRole();
    });

  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['fixture']);
  }
}

