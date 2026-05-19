import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputMaskDirective } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SummaryComponent } from '@components/cart/summary/summary.component';
import { TableComponent } from '@components/cart/table/table.component';
import { orderPatterns } from '@app/components/global/formPatterns';

export interface Field {
    id: string;
    label: string;
}

@Component({
    selector: 'app-checkout',
    imports: [
        InputText,
        ReactiveFormsModule,
        InputGroup,
        FloatLabel,
        NgClass,
        TableComponent,
        SummaryComponent,
        FormsModule,
        RadioButtonModule,
        InputMaskDirective,
        Checkbox,
    ],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css',
    providers: [ConfirmationService, MessageService],
})
export class CheckoutComponent {
    private createAddressForm(): FormGroup {
        return inject(FormBuilder).group({
            firstName: [
                '',
                [Validators.required, Validators.pattern(orderPatterns.name)],
            ],
            lastName: [
                '',
                [Validators.required, Validators.pattern(orderPatterns.name)],
            ],
            street: [
                '',
                [Validators.required, Validators.pattern(orderPatterns.street)],
            ],
            number: [
                '',
                [Validators.required, Validators.pattern(orderPatterns.number)],
            ],
            zipcode: [
                '',
                [
                    Validators.required,
                    Validators.pattern(orderPatterns.zipcode),
                ],
            ],
            city: [
                '',
                [Validators.required, Validators.pattern(orderPatterns.city)],
            ],
        });
    }

    protected readonly addressFields: Field[] = [
        { id: 'firstName', label: 'Vorname' },
        { id: 'lastName', label: 'Nachname' },
        { id: 'street', label: 'Straße' },
        { id: 'number', label: 'Hausnummer' },
        { id: 'zipcode', label: 'Postleitzahl' },
        { id: 'city', label: 'Stadt' },
    ];

    protected billingForm = this.createAddressForm();
    protected orderForm = this.createAddressForm();

    protected checked: boolean = false;

    protected paymentForm = inject(FormBuilder).group({
        sepaAccountHolder: ['', [Validators.required]],
        sepaIban: ['', [Validators.required]],
    });

    protected onSubmit(): void {
        if (
            this.orderForm.invalid ||
            this.paymentForm.invalid ||
            this.billingForm.invalid
        ) {
            this.orderForm.markAllAsTouched();
            this.paymentForm.markAllAsTouched();
            this.billingForm.markAllAsTouched();
            return;
        }

        console.log(this.orderForm.value);
        //TODO
    }
}
