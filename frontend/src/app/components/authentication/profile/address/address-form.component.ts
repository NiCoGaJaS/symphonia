import { Component, Input, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ADDRESS_PATTERNS } from '@components/global/form.patterns';
import { Address } from '@api/settings/settings.api';
import { EditableForm } from '@components/global/editable-form/editable-form.component';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

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

    @ViewChild('formView') private formView?: EditableForm;

    protected form = inject(FormBuilder).nonNullable.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        street: [
            '',
            [Validators.required, Validators.pattern(ADDRESS_PATTERNS.street)],
        ],
        houseNumber: [
            '',
            [
                Validators.required,
                Validators.pattern(ADDRESS_PATTERNS.house_number),
            ],
        ],
        postalCode: [
            '',
            [Validators.required, Validators.pattern(ADDRESS_PATTERNS.zipcode)],
        ],
        city: [
            '',
            [Validators.required, Validators.pattern(ADDRESS_PATTERNS.city)],
        ],
    });

    protected labels: Record<string, string> = {
        firstName: 'Vorname',
        lastName: 'Nachname',
        street: 'Straße',
        houseNumber: 'Hausnummer',
        postalCode: 'Postleitzahl',
        city: 'Stadt',
    };

    protected prefixes: Record<string, string> = {
        firstName: 'Der',
        lastName: 'Der',
        street: 'Die',
        houseNumber: 'Die',
        postalCode: 'Die',
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
                postalCode: value.postal_code,
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
                    severity: 'info',
                    summary: 'Adresse gespeichert',
                    detail: 'Deine Adresse wurde erfolgreich aktualisiert.',
                });
            },
            error: () => {
                this.formView?.restorePrevious();
                this.messages.add({
                    severity: 'error',
                    summary: 'Speichern fehlgeschlagen',
                    detail: 'Deine Adresse konnte nicht gespeichert werden. Bitte versuche es später erneut.',
                });
            },
        });
    }

    onAddressSave(): void {
        const { firstName, lastName, street, houseNumber, postalCode, city } =
            this.form.getRawValue();

        console.log(this.form.getRawValue());

        if (
            !firstName ||
            !lastName ||
            !street ||
            !houseNumber ||
            !postalCode ||
            !city
        ) {
            return;
        }

        this.updateAddress({
            first_name: firstName,
            last_name: lastName,
            street: street,
            house_number: houseNumber,
            postal_code: postalCode,
            city: city,
        });
    }

    onAddressClear(): void {
        this.updateAddress(null);
    }
}
