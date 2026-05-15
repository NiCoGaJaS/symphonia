import { Component, computed, inject } from '@angular/core';
import { Product, Products } from '@app/api/products/products.api';
import { CartService } from '@app/services/cart.service';
import { Divider } from 'primeng/divider';
import { PriceTagComponent } from '@components/global/price-tag/price-tag.component';
import { ProductImageComponent } from '@components/products/image/product-image.component';
import { toSignal } from '@angular/core/rxjs-interop';

type CardProduct = Product & {
    quantity: number;
};

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [ProductImageComponent, Divider, PriceTagComponent],
})
export class CartComponent {
    private readonly cartService = inject(CartService);
    private readonly productsApi = inject(Products);

    readonly cart = this.cartService.cart;

    readonly products = toSignal(this.productsApi.all(), {
        initialValue: [] as Product[],
    });

    private readonly productsMap = computed(() => {
        return new Map(
            this.products().map((product: Product): [string, Product] => [
                product.id,
                product,
            ]),
        );
    });

    readonly cartProducts = computed<CardProduct[]>(() =>
        this.cart()
            .map(({ id, quantity }) => {
                const product = this.productsMap().get(id);

                return product
                    ? {
                          ...product,
                          quantity,
                      }
                    : null;
            })
            .filter((item): item is CardProduct => item !== null),
    );

    readonly totalPrice = computed(() =>
        this.cartProducts().reduce(
            (total, { price, quantity }) => total + price * quantity,
            0,
        ),
    );

    getAmount(id: string): number {
        return this.cartService.getAmountOf(id);
    }
}
