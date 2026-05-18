import { Cart, CartItem } from '@app/api/cart/cart.store';
import { Component, computed, inject } from '@angular/core';
import { GetProductResponse, Products } from '@app/api/products/products.api';
import { Divider } from 'primeng/divider';
import { PriceTagComponent } from '@components/global/price-tag/price-tag.component';
import { ProductImageComponent } from '@components/products/image/product-image.component';
import { toSignal } from '@angular/core/rxjs-interop';

type CartProduct = GetProductResponse & {
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
    private readonly productsApi = inject(Products);
    protected readonly cart = inject(Cart);

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
