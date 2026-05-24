import {
    Authentication,
    LoginResponse,
} from '@api/authentication/authentication.api';
import {
    AuthenticationForm,
    AuthenticationFormProperties,
} from '@components/authentication/authentication-form.component';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@api/authentication/user.store';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, AuthenticationForm],
})
export class Login {
    private readonly router = inject(Router);
    private readonly authentication = inject(Authentication);
    private readonly user = inject(User);

    protected isLoggingIn = false;

    onLogin(form: AuthenticationFormProperties): void {
        const { email, password } = form.value;

        if (!email || !password) {
            return;
        }
        this.isLoggingIn = true;

        this.authentication
            .login(email, password)
            .pipe(finalize(() => (this.isLoggingIn = false)))
            .subscribe({
                next: (response: LoginResponse) => {
                    this.user.set(response.id, response.role);
                    this.router.navigate(['/profile']);
                },
                error: (error) => {
                    if (error.status === 401 || error.status === 400) {
                        form.setErrors({
                            invalidCredentials: true,
                        });
                    }

                    form.markAllAsTouched();
                },
            });
    }
}
