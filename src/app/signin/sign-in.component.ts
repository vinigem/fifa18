import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../alert/alert.service';

@Component({
    templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

    signInForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService,
        private alertService: AlertService, private router: Router) { }

    ngOnInit() {
        this.signInForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (!this.signInForm.valid) {
            this.alertService.addAlert('Invalid username or password', 'error');
        } else {
            const user = this.signInForm.value;
            this.authService.login(user).subscribe(status => {
                if(status) {
                    this.authService.setUserProfile(user);
                    this.router.navigate(['fixture']);
                } else {
                    this.alertService.addAlert('Invalid username or password', 'error');
                }
            }, error => {
                this.alertService.addAlert('Invalid username or password', 'error');
            });
        }
    }
}