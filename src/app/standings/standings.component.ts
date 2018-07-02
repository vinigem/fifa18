import { Component, OnInit } from '@angular/core';

import { AppService } from '../services/app.service';

@Component({
  templateUrl: './standings.component.html'
})
export class StandingsComponent implements OnInit {

  fixtures: any;
  standings: any;
  teams: any;
  
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
    let standings = [];
    this.fixtures.forEach(fixture => {
      if(fixture.name.indexOf('Group') != -1) {

        fixture.matches.forEach(match => {
          const matchTime = this.getUTC3Time(match.date, match.time);
          const groupName = match.group;
          const team1Name = match.team1.name;
          const team2Name = match.team2.name;

          let groupData = standings[groupName] ? standings[groupName] : [];
          let team1Data = groupData[team1Name] ? groupData[team1Name] : {p:0,w:0,l:0,d:0,gs:0,gc:0,pts:0}; 
          let team2Data = groupData[team2Name] ? groupData[team2Name] : {p:0,w:0,l:0,d:0,gs:0,gc:0,pts:0};

          if(this.isMatchOver(matchTime) && null != match.score1 && null != match.score2) {
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

            groupData[team1Name] = team1Data;
            groupData[team2Name] = team2Data;
            standings[groupName] = groupData;
          
          } else {
            groupData[team1Name] = team1Data;
            groupData[team2Name] = team2Data;
            standings[groupName] = groupData;  
          }
        });
      }
    }); 

    this.sortStandings(standings);
  }

  // Sort each group teams on points
  sortStandings(standings: any) {
    this.standings = [];
    
    for(var groupName in standings) {
      let groupData = standings[groupName];
      let teamsData = [];
      
      for(var teamName in groupData) {
        let teamData = { name: teamName };
        for(var k in groupData[teamName]) {
          teamData[k] = groupData[teamName][k];
        }
        teamsData.push(teamData);
      }
      
      teamsData.sort((a, b) => {
        let order = 0;
        if(a.pts > b.pts) {                         // Team 1 has higher points
          order = -1;
        
        } else if(a.pts < b.pts) {                  // Team 2 has higher points
          order = 1;
        
        } else {                                    // Both have equal points
        
          if((a.gs-a.gc) > (b.gs-b.gc)) {           // Team 1 has higher goal difference
            order = -1;
        
          } else if((a.gs-a.gc) < (b.gs-b.gc)) {    // Team 2 has higher goal difference
            order = 1;  
          }
        }
        
        return order;
      });

      this.standings[groupName] = teamsData; 
    }
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

  getTeamFlag(teamName: string) {
    let teams = this.teams.filter(team => {
      return team.name == teamName;
    });
    return teams[0].flag;
  }
  
}
