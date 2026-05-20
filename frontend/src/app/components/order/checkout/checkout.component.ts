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
    providers: [ConfirmationService, MessageService],
})
export class CheckoutComponent {
    private readonly formBuilder = inject(FormBuilder);

    createAddressForm(fb: FormBuilder): FormGroup {
        return fb.group({
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

    protected billingForm: FormGroup = this.createAddressForm(this.formBuilder);
    protected orderForm: FormGroup = this.createAddressForm(this.formBuilder);
    protected paymentForm = this.formBuilder.group({
        sepaAccountHolder: ['', [Validators.required]],
        sepaIban: ['', [Validators.required]],
    });

    protected checked: boolean = false;

    protected onSubmit(): void {
        const billingInvalid = !this.checked && this.billingForm.invalid;

        if (
            this.orderForm.invalid ||
            this.paymentForm.invalid ||
            billingInvalid
        ) {
            this.orderForm.markAllAsTouched();
            this.paymentForm.markAllAsTouched();

            if (!this.checked) {
                this.billingForm.markAllAsTouched();
            }
        }

        /* proceed the checkout using data from
         * 'this.orderForm.value', 'this.paymentForm.value'
         * and 'this.billingForm.value'
         * if needed. */
    }
}
