import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

    constructor(private httpClient: HttpClient) { }

    getFixtures(): Observable<any> {
        return this.httpClient.get("./assets/fixtures.json");
    }

    getTeams(): Observable<any> {
        return this.httpClient.get("./assets/teams.json");
    }
}