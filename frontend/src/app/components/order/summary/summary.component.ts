import { Cart, CartItem } from '@api/cart/cart.store';
import { Component, Input, computed, inject } from '@angular/core';
import { GetProductResponse, Products } from '@api/products/products.api';
import { Divider } from 'primeng/divider';
import { NgClass } from '@angular/common';
import { PriceTagComponent } from '@components/global/price-tag/price-tag.component';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

type CartProduct = GetProductResponse & {
    quantity: number;
};

@Component({
    selector: 'app-products-summary',
    imports: [Divider, PriceTagComponent, RouterLink, NgClass],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.css',
})
export class SummaryComponent {
    @Input() variant: 'cart' | 'checkout' = 'cart';

    private readonly productsApi = inject(Products);

    readonly cart = inject(Cart);

    readonly products = toSignal(this.productsApi.search(null), {
        initialValue: [] as GetProductResponse[],
    });

    private readonly productsMap = computed(() => {
        return new Map(
            this.products().map(
                (product: GetProductResponse): [string, GetProductResponse] => [
                    product.id,
                    product,
                ],
            ),
        );
    });

    readonly cartProducts = computed<CartProduct[]>(() =>
        this.cart
            .getItems()
            .map(({ id, quantity }: CartItem) => {
                const product = this.productsMap().get(id);

                return product
                    ? {
                          ...product,
                          quantity,
                      }
                    : null;
            })
            .filter((item): item is CartProduct => item !== null),
    );

    readonly totalPrice = computed(() =>
        this.cartProducts().reduce(
            (total, { price, quantity }) => total + price * quantity,
            0,
        ),
    );
}
