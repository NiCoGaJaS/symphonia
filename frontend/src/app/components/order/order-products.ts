import { Cart, CartItem } from '@api/cart/cart.store';
import { GetProductResponse, Products } from '@api/products/products.api';
import { Signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

export type CartProduct = GetProductResponse & {
    quantity: number;
};

export interface CartProductsSignals {
    products: Signal<GetProductResponse[]>;
    cartProducts: Signal<CartProduct[]>;
    totalPrice: Signal<number>;
}

export function createCartProductsSignals(cart: Cart): CartProductsSignals {
    const productsApi = inject(Products);

    const products = toSignal(productsApi.search(null, null, null, null), {
        initialValue: [] as GetProductResponse[],
    });

    const productsMap = computed(
        () =>
            new Map(
                products().map(
                    (
                        product: GetProductResponse,
                    ): [string, GetProductResponse] => [product.id, product],
                ),
            ),
    );

    const cartProducts = computed<CartProduct[]>(() =>
        cart
            .getItems()
            .map(({ id, quantity }: CartItem) => {
                const product = productsMap().get(id);

                return product
                    ? {
                          ...product,
                          quantity,
                      }
                    : null;
            })
            .filter((item): item is CartProduct => item !== null),
    );

    const totalPrice = computed(() =>
        cartProducts().reduce(
            (total, { price, quantity }) => total + price * quantity,
            0,
        ),
    );

    return {
        products,
        cartProducts,
        totalPrice,
    };
}
