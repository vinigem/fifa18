import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../alert/alert.service';


@Component({
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService,
        private alertService: AlertService, private router: Router) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.signUpForm = this.formBuilder.group({
            name: ['', [ Validators.required ]],
            username: ['', [ Validators.required, Validators.min(5) ]],
            mobile: ['', [ Validators.required, Validators.min(10) ]],
            password: ['', [ Validators.required, , Validators.min(6) ]]
        });
    }

    onSubmit() {
        if (!this.signUpForm.valid) {
            this.alertService.addAlert('Invalid form fields', 'error');
        } else {
            const user = this.signUpForm.value;
            user.role = 'USER';
            this.authService.register(user).subscribe(status => {
                if (status) {
                    this.alertService.addAlert('Sign Up is successful. Proceed to sign in', 'success');
                    this.router.navigate(['signin']);
                } else {
                    this.alertService.addAlert('Sign Up failed', 'error');
                }
            }, error => {
                this.alertService.addAlert('Sign Up failed', 'error');
            });
        }
    }
}