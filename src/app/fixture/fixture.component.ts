import { Component, OnInit } from '@angular/core';

import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './fixture.component.html'
})
export class FixtureComponent implements OnInit {

  fixtures: any;
  teams: any;
  currentRound: any;
  
  constructor(private appService: AppService, private authService: AuthService) { }

  ngOnInit() {
    this.loadFixtures();
    this.loadTeams();
  }

  loadFixtures() {
    this.appService.getFixtures().subscribe( data => {
      this.fixtures = data;
      this.loadCurrentFixture();
    });
  }

  loadTeams() {
    this.appService.getTeams().subscribe( data => {
      this.teams = data;
    }); 
  }

  loadCurrentFixture() {
    const today = new Date();
    this.fixtures.forEach( (round: any, idx: number) => {
      if(this.currentRound == null) {
        round.matches.forEach(match => {
          let matchDate = new Date(match.date);
          if(matchDate.getDate() >= today.getDate() && matchDate.getMonth() >= today.getMonth()) {
            this.currentRound = idx;
          }
        });
      }
    });
  }

  getTeamFlag(teamCode: string) {
    let teams = this.teams.filter(team => {
      return team.fifaCode == teamCode;
    });
    return teams[0].flag;
  }

  getUTC3Time(date, time) {
    const dateTime = new Date(date + 'T' + time + ':00+03:00'); //UTC+3
    return dateTime;
  }
  
}
