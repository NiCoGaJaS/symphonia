import { Cart, CartItem } from '@api/cart/cart.store';
import { computed, signal } from '@angular/core';

export function createCart(items: CartItem[]): Cart {
    const cart = signal<CartItem[]>(items);
    return {
        getItems: () => cart(),
        getAmount: computed(() =>
            cart().reduce((total, item) => total + item.quantity, 0),
        ),
        getAmountOf: (id: string) =>
            cart().find((i) => i.id === id)?.quantity ?? 0,
        setAmountOf: (id: string, quantity: number) => {
            if (quantity <= 0) {
                cart.update((items) => items.filter((i) => i.id !== id));
                return;
            }

            cart.update((items) => {
                const existing = items.find((i) => i.id === id);
                return existing
                    ? items.map((i) => (i.id === id ? { ...i, quantity } : i))
                    : [...items, { id, quantity }];
            });
        },
    } as Cart;
}
