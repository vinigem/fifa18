import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

    constructor(private httpClient: HttpClient) { }

    getFixtures(): Observable<any> {
        return this.httpClient.get("/api/getFixtures");
    }

    getTeams(): Observable<any> {
        return this.httpClient.get("/api/getTeams");
    }
}