import { Component, Input, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
        street: ['', [Validators.required]],
        houseNumber: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        city: ['', [Validators.required]],
    });

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
                    summary: 'Name gespeichert',
                    detail: 'Dein Name wurde erfolgreich aktualisiert.',
                });
            },
            error: () => {
                this.formView?.restorePrevious();
                this.messages.add({
                    severity: 'error',
                    summary: 'Speichern fehlgeschlagen',
                    detail: 'Dein Name konnte nicht gespeichert werden. Bitte versuche es später erneut.',
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
