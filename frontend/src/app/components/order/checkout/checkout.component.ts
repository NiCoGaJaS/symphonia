import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { InputComponent } from '@components/global/input/input.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SummaryComponent } from '@components/order/summary/summary.component';
import { TableComponent } from '@components/order/table/table.component';
import { orderPatterns } from '@app/components/global/formPatterns';

export interface Field {
    id: string;
    label: string;
}

@Component({
    selector: 'app-checkout',
    imports: [
        ReactiveFormsModule,
        TableComponent,
        SummaryComponent,
        FormsModule,
        RadioButtonModule,
        Checkbox,
        InputComponent,
    ],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
    private readonly formBuilder = inject(FormBuilder);

    createAddressForm(fb: FormBuilder): FormGroup {
        return fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
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

    protected billingAddress: FormGroup = this.createAddressForm(
        this.formBuilder,
    );
    protected orderAddress: FormGroup = this.createAddressForm(
        this.formBuilder,
    );
    protected paymentDetails = this.formBuilder.group({
        sepaAccountHolder: ['', [Validators.required]],
        sepaIban: ['', [Validators.required]],
    });

    protected checked: boolean = false;

    protected onSubmit(): void {
        const billingInvalid = !this.checked && this.billingAddress.invalid;

        if (
            this.orderAddress.invalid ||
            this.paymentDetails.invalid ||
            billingInvalid
        ) {
            this.orderAddress.markAllAsTouched();
            this.paymentDetails.markAllAsTouched();

            if (!this.checked) {
                this.billingAddress.markAllAsTouched();
            }
        }

        /* proceed the checkout using data from
         * 'this.orderAddress.value', 'this.paymentDetails.value'
         * and 'this.billingAddress.value'
         * if needed. */
    }
}
