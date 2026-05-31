import {
    Address,
    Name,
    PaymentDetails,
    Settings,
} from '@api/settings/settings.api';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
    PLATFORM_ID,
    ViewChild,
    inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { AddressForm } from '@components/authentication/profile/address/address-form.component';
import { Authentication } from '@api/authentication/authentication.api';
import { EditableForm } from '@components/global/editable-form/editable-form.component';
import { FloatLabel } from 'primeng/floatlabel';
import { InputMaskDirective } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { PAYMENT_PATTERNS } from '@components/global/form.patterns';
import { Router } from '@angular/router';
import { HistoryComponent } from '@components/order/history/history.component';
import { TableModule } from 'primeng/table';
import { User } from '@api/authentication/user.store';
import { allOrNoneValidator } from '@components/global/form.validators';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-profile',
    imports: [
        AddressForm,
        FloatLabel,
        InputText,
        ReactiveFormsModule,
        EditableForm,
        InputMaskDirective,
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [RouterLink, TableModule, HistoryComponent],
})
export class Profile implements OnInit {
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    private readonly cdr = inject(ChangeDetectorRef);

    private readonly user = inject(User);
    private readonly authentication = inject(Authentication);
    protected readonly settings = inject(Settings);

    private readonly router = inject(Router);
    private readonly messages = inject(MessageService);
    private readonly fb = inject(FormBuilder);

    @ViewChild('nameForm') private readonly nameForm?: EditableForm;
    @ViewChild('paymentForm') private readonly paymentForm?: EditableForm;

    protected isLoggingOut = false;

    protected name = this.fb.group(
        {
            firstName: [''],
            lastName: [''],
        },
        {
            validators: allOrNoneValidator(),
        },
    );

    protected nameLabels: Record<string, string> = {
        firstName: 'Vorname',
        lastName: 'Nachname',
    };

    protected namePrefixes: Record<string, string> = {
        firstName: 'Der',
        lastName: 'Der',
    };

    protected payment = this.fb.group(
        {
            holder: [''],
            iban: ['', [Validators.pattern(PAYMENT_PATTERNS.iban)]],
        },
        {
            validators: allOrNoneValidator(),
        },
    );

    protected paymentLabels: Record<string, string> = {
        holder: 'Kontoinhaber',
        iban: 'IBAN',
    };

    protected paymentPrefixes: Record<string, string> = {
        holder: 'Der',
        iban: 'Die',
    };

    protected shipping: Address | null = null;
    protected billing: Address | null = null;

    ngOnInit(): void {
        if (this.isBrowser) {
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

                this.cdr.markForCheck();
            });
        }
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

    updateName(name: Name | null): void {
        this.settings.name(name).subscribe({
            next: () => {
                this.messages.add({
                    severity: 'success',
                    summary: 'Name aktualisiert',
                    detail: 'Dein Name wurde erfolgreich aktualisiert.',
                });
            },
            error: () => {
                this.nameForm?.restorePrevious();
                this.messages.add({
                    severity: 'error',
                    summary: 'Aktualisierung fehlgeschlagen',
                    detail: 'Dein Name konnte nicht aktualisiert werden. Bitte versuche es später erneut.',
                });
            },
        });
    }

    onNameSave(): void {
        const { firstName, lastName } = this.name.getRawValue();

        if (!firstName && !lastName) {
            this.updateName(null);
            return;
        }

        if (!firstName || !lastName) {
            return;
        }

        this.updateName({
            first_name: firstName,
            last_name: lastName,
        });
    }

    updatePayment(payment: PaymentDetails | null): void {
        this.settings.payment(payment).subscribe({
            next: () => {
                this.messages.add({
                    severity: 'success',
                    summary: 'Zahlungsart aktualisiert',
                    detail: 'Deine Zahlungsart wurde erfolgreich aktualisiert.',
                });
            },
            error: () => {
                this.paymentForm?.restorePrevious();
                this.messages.add({
                    severity: 'error',
                    summary: 'Aktualisierung fehlgeschlagen',
                    detail: 'Deine Zahlungsart konnte nicht aktualisiert werden. Bitte versuche es später erneut.',
                });
            },
        });
    }

    onPaymentSave(): void {
        const { holder, iban } = this.payment.getRawValue();

        if (!holder && !iban) {
            this.updatePayment(null);
            return;
        }

        if (!holder || !iban) {
            return;
        }

        this.updatePayment({ holder, iban });
    }

    saveShipping = (address: Address | null): Observable<void> => {
        return this.settings.shipping(address);
    };

    saveBilling = (address: Address | null): Observable<void> => {
        return this.settings.billing(address);
    };
}
