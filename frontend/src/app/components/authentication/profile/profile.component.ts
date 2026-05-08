import { Component, inject } from '@angular/core';
import { Authentication } from '@api/authentication/authentication.api';
import { Router } from '@angular/router';
import { User } from '@api/authentication/user.store';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-profile',
    imports: [],
    templateUrl: './profile.component.html',
})
export class Profile {

    private readonly user = inject(User);
    private readonly authentication = inject(Authentication);
    private readonly router = inject(Router);

    protected isLoggingOut = false;

    onLogout(): void {
        if (this.isLoggingOut) {
            return;
        }

        this.isLoggingOut = true;

        this.authentication.logout()
            .pipe(finalize(() => {
                this.user.clear();
                this.isLoggingOut = false;
                this.router.navigate(['/']);
            })); // ToDO: doesnt work
    }

}
