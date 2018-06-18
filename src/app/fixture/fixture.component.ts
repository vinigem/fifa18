import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'fixture',
  templateUrl: './fixture.component.html'
})
export class FixtureComponent implements OnInit {

  fixtures: any;
  teams: any;
  currentRound: any;
  
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.loadFixtures();
    this.loadTeams();
  }

  loadFixtures() {
    this.appService.getFixtures().subscribe( data => {
      this.fixtures = data.rounds;
      this.loadCurrentFixture();
    });
  }

  loadTeams() {
    this.appService.getTeams().subscribe( data => {
      this.teams = data.teams;
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

  getISTMatchTime(date, time) {
    const dateTime = new Date(date + 'T' + time + ':00+03:00'); //UTC+3
    return dateTime;

  }
  
}