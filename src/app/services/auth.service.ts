import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

const LOGIN_URL:string = '/api/login';
const REGISTER_URL:string = '/api/register';

@Injectable()
export class AuthService {
    
    constructor(public httpClient : HttpClient) {}

    getUsername(): string {
        if(localStorage.getItem('profile') != null) {
            const profile = JSON.parse(localStorage.getItem('profile'));
            return profile.username;
        } else {
            return null;;
        }
    }

    register(user: any): Observable<any> {
        return this.httpClient.post(REGISTER_URL, user);
    }

    login(user: any): Observable<any> {
        return this.httpClient.post(LOGIN_URL, user);
    }

    setUserProfile(user: any) {
        const token = btoa(user.username + ':' + user.password);
        const profile = {
            username: user.username,
            access_token: token
        }
        localStorage.setItem('profile', JSON.stringify(profile));
    }
  
    isLoggedIn(): boolean {
        return localStorage.getItem('profile') != null;
    }

}