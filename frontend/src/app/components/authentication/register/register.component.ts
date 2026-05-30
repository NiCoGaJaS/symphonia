import {
    Authentication,
    RegisterResponse,
} from '@api/authentication/authentication.api';
import {
    AuthenticationForm,
    AuthenticationFormProperties,
} from '@components/authentication/authentication-form.component';
import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '@api/authentication/user.store';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-register',
    imports: [AuthenticationForm],
    templateUrl: './register.component.html',
})
export class Register {
    private readonly router = inject(Router);
    private readonly authentication = inject(Authentication);
    private readonly user = inject(User);
    private readonly messages: MessageService = inject(MessageService);

    protected isRegistering = false;

    onRegister(form: AuthenticationFormProperties): void {
        const { email, password } = form.value;

        if (!email || !password) {
            return;
        }
        this.isRegistering = true;

        this.authentication
            .register(email, password)
            .pipe(finalize(() => (this.isRegistering = false)))
            .subscribe({
                next: (response: RegisterResponse) => {
                    this.user.set(response.id, response.role);
                    this.router.navigate(['/profile']);
                    this.messages.add({
                        severity: 'success',
                        summary: 'Registrierung',
                        detail: 'Kundenkonto wurde erfolgreich erstellt.',
                    });
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
