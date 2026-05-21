import {
    CartProduct,
    CartProductsSignals,
    createCartProductsSignals,
} from '@components/order/order-products';
import { Component, Input, Signal, inject } from '@angular/core';
import { Cart } from '@api/cart/cart.store';
import { Divider } from 'primeng/divider';
import { NgClass } from '@angular/common';
import { PriceTagComponent } from '@components/global/price-tag/price-tag.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-products-summary',
    imports: [Divider, PriceTagComponent, RouterLink, NgClass],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.css',
})
export class SummaryComponent {
    @Input() variant: 'cart' | 'checkout' = 'cart';

    readonly cart: Cart = inject(Cart);

    private readonly cartSignals: CartProductsSignals =
        createCartProductsSignals(this.cart);

    readonly cartProducts: Signal<CartProduct[]> =
        this.cartSignals.cartProducts;
    readonly totalPrice: Signal<number> = this.cartSignals.totalPrice;
}
