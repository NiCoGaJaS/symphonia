import { Component, inject, input } from '@angular/core';
import { Cart } from '@api/cart';
import { DecimalPipe } from '@angular/common';
import { Divider } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { GetProductDetailResponse } from '@app/api/products/products.api';
import { InputNumber } from 'primeng/inputnumber';

@Component({
    selector: 'app-product-info',
    imports: [DecimalPipe, Divider, FormsModule, InputNumber],
    templateUrl: './product-info.component.html',
    styleUrls: [
        './product-info.component.css',
        '../../products.css',
        '../../../../../styles.css',
    ],
})
export class ProductInfoComponent {
    readonly product = input.required<GetProductDetailResponse>();

    private readonly cart= inject(Cart);

    addToCart(): void {
        this.cart.addToCart({
            id: this.product().id,
            quantity: this.amount,
        });
    }

    amount: number = 1;
}
