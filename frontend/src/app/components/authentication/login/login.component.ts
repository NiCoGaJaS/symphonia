import { Authentication, LoginResponse } from '@api/authentication/authentication.api';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Avatar } from 'primeng/avatar';
import { Divider } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';
import { Password} from 'primeng/password';
import { Router } from '@angular/router';
import { User } from '@api/authentication/user.store';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    standalone: true,
    imports: [
        Avatar,
        InputGroup,
        InputGroupAddon,
        FloatLabel,
        FormsModule,
        InputText,
        Password,
        Divider,
        ReactiveFormsModule,
    ],
    styleUrl: 'login.component.css',
})
export class Login {

    private readonly router = inject(Router);
    private readonly authentication = inject(Authentication);
    private readonly user = inject(User);

    protected form = inject(FormBuilder).group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    protected isLoggingIn = false;

    onLogin(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoggingIn = true;
        const { email, password } = this.form.value;

        this.authentication.login(email!, password!)
            .pipe(finalize(() => this.isLoggingIn = false))
            .subscribe({
                next: (response: LoginResponse) => {
                    this.user.set(response.id, response.role);
                    this.router.navigate(['/profile']);
                },
                error: (error) => {
                    if (error.status === 401 || error.status === 400) {
                        this.form.setErrors({
                            invalidCredentials: true
                        })
                    }

                    this.form.markAllAsTouched();
                }
            });
    }
}
