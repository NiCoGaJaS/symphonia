import { Address, Settings } from '@api/settings/settings.api';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AddressForm } from '@components/authentication/profile/address/address-form.component';
import { Authentication } from '@api/authentication/authentication.api';
import { EditableForm } from '@components/global/editable-form/editable-form.component';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { User } from '@api/authentication/user.store';

@Component({
    selector: 'app-profile',
    imports: [
        AddressForm,
        FloatLabel,
        InputText,
        ReactiveFormsModule,
        EditableForm,
        RouterLink,
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class Profile implements OnInit {
    private readonly user = inject(User);
    private readonly authentication = inject(Authentication);
    protected readonly settings = inject(Settings);

    private readonly router = inject(Router);
    private readonly messages = inject(MessageService);
    private readonly fb = inject(FormBuilder);

    @ViewChild('nameForm') private nameForm?: EditableForm;
    @ViewChild('paymentForm') private paymentForm?: EditableForm;

    protected isLoggingOut = false;

    protected name = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
    });

    protected payment = this.fb.group({
        holder: ['', [Validators.required]],
        iban: ['', Validators.required],
    });

    protected shipping: Address | null = null;
    protected billing: Address | null = null;

    ngOnInit(): void {
        this.settings.get().subscribe((response) => {
            this.name.patchValue({
                firstName: response.first_name ?? '',
                lastName: response.last_name ?? '',
            });

            this.payment.patchValue({
                holder: response.payment?.holder ?? '',
                iban: response.payment?.iban ?? '',
            });

            this.shipping = response.shipping;
            this.billing = response.billing;
        });
    }

    onLogout(): void {
        if (this.isLoggingOut) {
            return;
        }

        this.isLoggingOut = true;

        this.authentication
            .logout()
            .pipe(
                finalize(() => {
                    this.user.clear();
                    this.isLoggingOut = false;
                    this.router.navigate(['/']);
                }),
            )
            .subscribe();
    }

    updateName(firstName: string | null, lastName: string | null): void {
        this.settings.name(firstName, lastName).subscribe({
            next: () => {
                this.messages.add({
                    severity: 'info',
                    summary: 'Name gespeichert',
                    detail: 'Dein Name wurde erfolgreich aktualisiert.',
                });
            },
            error: () => {
                this.nameForm?.restorePrevious();
                this.messages.add({
                    severity: 'error',
                    summary: 'Speichern fehlgeschlagen',
                    detail: 'Dein Name konnte nicht gespeichert werden. Bitte versuche es später erneut.',
                });
            },
        });
    }

    onNameSave(): void {
        const { firstName, lastName } = this.name.getRawValue();

        if (!firstName || !lastName) {
            return;
        }

        this.updateName(firstName, lastName);
    }

    onNameClear(): void {
        this.updateName(null, null);
    }

    updatePayment(holder: string | null, iban: string | null): void {
        this.settings.payment(holder, iban).subscribe({
            next: () => {
                this.messages.add({
                    severity: 'info',
                    summary: 'Zahlungsart gespeichert',
                    detail: 'Deine Zahlungsart wurde erfolgreich aktualisiert.',
                });
            },
            error: () => {
                this.paymentForm?.restorePrevious();
                this.messages.add({
                    severity: 'error',
                    summary: 'Speichern fehlgeschlagen',
                    detail: 'Deine Zahlungsart konnte nicht gespeichert werden. Bitte versuche es später erneut.',
                });
            },
        });
    }

    onPaymentSave(): void {
        const { holder, iban } = this.payment.getRawValue();

        if (!holder || !iban) {
            return;
        }

        this.updatePayment(holder, iban);
    }

    onPaymentClear(): void {
        this.updateName(null, null);
    }

    saveShipping = (address: Address | null): Observable<void> => {
        return this.settings.shipping(address);
    };

    saveBilling = (address: Address | null): Observable<void> => {
        return this.settings.billing(address);
    };
}
