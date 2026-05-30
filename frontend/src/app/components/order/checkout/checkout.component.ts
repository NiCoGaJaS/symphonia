import { Component, ViewChild, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Cart } from '@api/cart/cart.store';
import { Checkbox } from 'primeng/checkbox';
import { InputComponent } from '@components/global/input/input.component';
import { MessageService } from 'primeng/api';
import { Orders } from '@api/products/orders.api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Router } from '@angular/router';
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
    private readonly orders = inject(Orders);
    private readonly messages = inject(MessageService);
    private readonly router = inject(Router);
    private readonly cart = inject(Cart);
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

    @ViewChild('table') private readonly table?: TableComponent;

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

        const rawShipping = this.orderAddress.getRawValue();
        const rawPayment = this.paymentDetails.getRawValue();
        const rawBilling = this.billingAddress.getRawValue();

        if (!rawPayment.sepaAccountHolder || !rawPayment.sepaIban) {
            return;
        }

        const products = this.table?.cartProducts().map((product) => {
            return {
                id: product.id,
                amount: product.quantity,
            };
        });

        if (!products) {
            return;
        }

        this.orders
            .submit({
                products: products,
                shipping: {
                    first_name: rawShipping.firstName,
                    last_name: rawShipping.lastName,
                    city: rawShipping.city,
                    zipcode: rawShipping.zipcode,
                    street: rawShipping.street,
                    house_number: rawShipping.number,
                },
                payment: {
                    holder: rawPayment.sepaAccountHolder,
                    iban: rawPayment.sepaIban,
                },
                billing: this.checked
                    ? null
                    : {
                          first_name: rawBilling.firstName,
                          last_name: rawBilling.lastName,
                          city: rawBilling.city,
                          zipcode: rawBilling.zipcode,
                          street: rawBilling.street,
                          house_number: rawBilling.number,
                      },
            })
            .subscribe({
                next: () => {
                    this.messages.add({
                        severity: 'success',
                        summary: 'Bestellung eingegangen',
                        detail: 'Deine Bestellung ist erfolgreich eingegangen und wird bearbeitet.',
                    });

                    this.cart.clear();

                    this.router.navigate(['/']);
                },
                error: () => {
                    this.messages.add({
                        severity: 'error',
                        summary: 'Bestellung fehlgeschlagen',
                        detail: 'Bestellung konnte nicht abgeschlossen werden. Versuche es später erneut.',
                    });
                },
            });
    }
}
