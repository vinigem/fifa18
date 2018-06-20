import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { FixtureComponent } from './fixture/fixture.component';
import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';
import { ScoreComponent } from './score/score.component';
import { StandingsComponent } from './standings/standings.component';

const routes: Routes = [
    { path: '', redirectTo: 'fixture', pathMatch: 'full' },
    { path: 'fixture', component: FixtureComponent },
    { path: 'standings', component: StandingsComponent },
    { path: 'score', component: ScoreComponent, canActivate: [ AuthGuard ] },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
