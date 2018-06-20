import { Component, OnInit } from '@angular/core';

import { AppService } from '../services/app.service';

@Component({
  templateUrl: './standings.component.html'
})
export class StandingsComponent implements OnInit {

  fixtures: any;
  teams: any;
  standings: any;
  
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.loadFixtures();
    this.loadTeams();
  }

  loadFixtures() {
    this.appService.getFixtures().subscribe( data => {
      this.fixtures = data;
      this.loadStandings();
    });
  }

  loadTeams() {
    this.appService.getTeams().subscribe( data => {
      this.teams = data;
    }); 
  }

  loadStandings() {
    this.standings = [];
    this.fixtures.forEach(fixture => {
      fixture.matches.forEach(match => {
        let matchTime = this.getUTC3Time(match.date, match.time);
        
        if(this.isMatchOver(matchTime) && null != match.score1 && null != match.score2) {
          let groupData = this.standings[match.group] ? this.standings[match.group] : [];
          let team1Data = groupData[match.team1.name] ? groupData[match.team1.name] : {p:0,w:0,l:0,d:0,gs:0,gc:0,pts:0}; 
          let team2Data = groupData[match.team2.name] ? groupData[match.team2.name] : {p:0,w:0,l:0,d:0,gs:0,gc:0,pts:0};
          
          // Match Played
          team1Data.p = team1Data.p + 1;
          team2Data.p = team2Data.p + 1;
          
          if(match.score1 > match.score2) {
            team1Data.w = team1Data.w + 1; // Team 1 Won
            team2Data.l = team2Data.l + 1; // Team 2 Lost
            team1Data.pts = team1Data.pts + 3; // Team 1 Pts increased
          
          } else if(match.score1 < match.score2) {
            team1Data.l = team1Data.l + 1; // Team 1 Lost
            team2Data.w = team2Data.w + 1;// Team 2 Won
            team2Data.pts = team2Data.pts + 3;// Team 3 Pts increased
            
          } else {
            team1Data.d = team1Data.d + 1; // Team 1 Drawn
            team2Data.d = team2Data.d + 1; // Team 2 Drawn
            team1Data.pts = team1Data.pts + 1; // Team 1 Pts increased
            team2Data.pts = team2Data.pts + 1; // Team 2 Pts increased
          }

          // Goals Scored
          team1Data.gs = team1Data.gs + match.score1;
          team2Data.gs = team2Data.gs + match.score2;

          // Goals Conceeded
          team1Data.gc = team1Data.gc + match.score2;
          team2Data.gc = team2Data.gc + match.score1;

          groupData[match.team1.name] = team1Data;
          groupData[match.team2.name] = team2Data;
          this.standings[match.group] = groupData;
        
        } else {
          let groupData = this.standings[match.group] ? this.standings[match.group] : [];
          let team1Data = groupData[match.team1.name] ? groupData[match.team1.name] : {p:0,w:0,l:0,d:0,gs:0,gc:0,pts:0}; 
          let team2Data = groupData[match.team2.name] ? groupData[match.team2.name] : {p:0,w:0,l:0,d:0,gs:0,gc:0,pts:0};
          groupData[match.team1.name] = team1Data;
          groupData[match.team2.name] = team2Data;
          this.standings[match.group] = groupData;  
        }
      });
    }); 

    // Sort each group teams on points
    this.standings.forEach(group => {
      group.sort(function(a,b) {return (a.pts > b.pts) ? -1 : ((b.pts > a.pts) ? 1 : 0);} );  
    }); 
  }

  getTeamFlag(teamCode: string) {
    let teams = this.teams.filter(team => {
      return team.fifaCode == teamCode;
    });
    return teams[0].flag;
  }

  getUTC3Time(date, time) {
    const dateTime = new Date(date + 'T' + time + ':00+03:00'); // UTC+3
    return dateTime;
  }

  isMatchOver(matchTime: any) {
    let now: any = new Date();
    let diffMs: any = now - matchTime; // milliseconds difference
    let diffMinutes = Math.round(diffMs / 60000); // minutes difference
    return diffMinutes > 180; // match started 3 hours ago
  }

  getKeys(map){
    return Object.keys(map);
  }
  
}
