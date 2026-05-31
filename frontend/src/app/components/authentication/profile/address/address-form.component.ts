import { Component, Input, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ADDRESS_PATTERNS } from '@components/global/form.patterns';
import { Address } from '@api/settings/settings.api';
import { EditableForm } from '@components/global/editable-form/editable-form.component';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { allOrNoneValidator } from '@components/global/form.validators';

@Component({
    selector: 'app-address-form',
    imports: [FloatLabel, InputText, ReactiveFormsModule, EditableForm],
    templateUrl: './address-form.component.html',
    styleUrl: './address-form.component.css',
})
export class AddressForm {
    private readonly messages = inject(MessageService);

    @Input({ required: true }) title = '';
    @Input({ required: true }) save!: (
        address: Address | null,
    ) => Observable<void>;

    @ViewChild('formView') private readonly formView?: EditableForm;

    protected form = inject(FormBuilder).nonNullable.group(
        {
            firstName: [''],
            lastName: [''],
            street: ['', [Validators.pattern(ADDRESS_PATTERNS.street)]],
            houseNumber: [
                '',
                [Validators.pattern(ADDRESS_PATTERNS.house_number)],
            ],
            zipcode: ['', [Validators.pattern(ADDRESS_PATTERNS.zipcode)]],
            city: ['', [Validators.pattern(ADDRESS_PATTERNS.city)]],
        },
        {
            validators: allOrNoneValidator(),
        },
    );

    protected labels: Record<string, string> = {
        firstName: 'Vorname',
        lastName: 'Nachname',
        street: 'Straße',
        houseNumber: 'Hausnummer',
        zipcode: 'Postleitzahl',
        city: 'Stadt',
    };

    protected prefixes: Record<string, string> = {
        firstName: 'Der',
        lastName: 'Der',
        street: 'Die',
        houseNumber: 'Die',
        zipcode: 'Die',
        city: 'Die',
    };

    private _current: Address | null = null;

    @Input({ required: true })
    set current(value: Address | null) {
        this._current = value;

        if (value) {
            this.form.patchValue({
                firstName: value.first_name,
                lastName: value.last_name,
                street: value.street,
                houseNumber: value.house_number,
                zipcode: value.zipcode,
                city: value.city,
            });
        }
    }

    get current(): Address | null {
        return this._current;
    }

    updateAddress(address: Address | null): void {
        this.save(address).subscribe({
            next: () => {
                this.messages.add({
                    severity: 'success',
                    summary: 'Adresse aktualisiert',
                    detail: 'Deine Adresse wurde erfolgreich aktualisiert.',
                });
            },
            error: () => {
                this.formView?.restorePrevious();
                this.messages.add({
                    severity: 'error',
                    summary: 'Aktualisierung fehlgeschlagen',
                    detail: 'Deine Adresse konnte nicht aktualisiert werden. Bitte versuche es später erneut.',
                });
            },
        });
    }

    onAddressSave(): void {
        const { firstName, lastName, street, houseNumber, zipcode, city } =
            this.form.getRawValue();

        if (
            !firstName &&
            !lastName &&
            !street &&
            !houseNumber &&
            !zipcode &&
            !city
        ) {
            this.updateAddress(null);
            return;
        }

        if (
            !firstName ||
            !lastName ||
            !street ||
            !houseNumber ||
            !zipcode ||
            !city
        ) {
            return;
        }

        this.updateAddress({
            first_name: firstName,
            last_name: lastName,
            street: street,
            house_number: houseNumber,
            zipcode: zipcode,
            city: city,
        });
    }
}
