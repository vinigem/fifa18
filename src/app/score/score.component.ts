import { Component, OnInit } from '@angular/core';

import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../alert/alert.service';

@Component({
  templateUrl: './score.component.html'
})
export class ScoreComponent implements OnInit {

  fixtures: any;
  teams: any;
  currentRound: any;
  
  constructor(private appService: AppService, private authService: AuthService,
    private alertService: AlertService) { }

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
    if(this.currentRound == null) {
      this.currentRound = this.fixtures.length - 1;
    }
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

  updateScore(fixture, match, idx) {
    fixture.matches[idx] = match;
    this.appService.updateFixture(fixture).subscribe(status => {
      if(status) {
        this.alertService.addAlert('Scores updated..!!', 'success');
      } else {
        this.alertService.addAlert('Error while updating score', 'error');
      }
    })  
  }

  
}
