import {
    Injectable,
    PLATFORM_ID,
    computed,
    inject,
    signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'shopping_cart';

export interface CartItem {
    id: string;
    quantity: number;
}

@Injectable({
    providedIn: 'root',
})
export class Cart {
    readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    private readonly cartState = signal<CartItem[]>([]);
    readonly cart = this.cartState.asReadonly();

    readonly totalItems = computed(() =>
        this.cartState().reduce((total, item) => total + item.quantity, 0),
    );

    constructor() {
        if (this.isBrowser) {
            this.cartState.set(Cart.loadCartFromStorage());
        }
    }

    private static loadCartFromStorage(): CartItem[] {
        const cart = localStorage.getItem(STORAGE_KEY);

        if (!cart) {
            return [];
        }

        return JSON.parse(cart) as CartItem[];
    }

    private persistCart(cart: CartItem[]): void {
        if (!this.isBrowser) {
            return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }

    addToCart(item: CartItem): void {
        if (item.quantity <= 0) {
            return;
        }

        this.cartState.update((cart) => {
            const existing = cart.find((i) => i.id === item.id);

            const updatedCart = existing
                ? cart.map((i) =>
                      i.id === item.id
                          ? {
                                ...i,
                                quantity: i.quantity + item.quantity,
                            }
                          : i,
                  )
                : [...cart, item];

            this.persistCart(updatedCart);

            return updatedCart;
        });
    }

    getAmountOf(id: string): number {
        return this.cartState().find((i) => i.id === id)?.quantity ?? 0;
    }

    pruneToExistingIds(existingProductIds: Set<string>): void {
        if (!this.isBrowser) {
            return;
        }

        const pruned = this.cartState().filter((item) =>
            existingProductIds.has(item.id),
        );

        if (pruned.length === this.cartState().length) {
            return;
        }

        this.cartState.set(pruned);
        this.persistCart(pruned);
    }
}
