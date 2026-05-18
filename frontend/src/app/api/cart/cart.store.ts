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
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    private readonly items = signal<CartItem[]>([]);

    readonly getAmount = computed(() =>
        this.items().reduce((total, item) => total + item.quantity, 0),
    );

    constructor() {
        if (this.isBrowser) {
            this.items.set(Cart.loadCartFromStorage());
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

        this.items.update((cart: CartItem[]): CartItem[] => {
            const existing = cart.find((i: CartItem) => i.id === item.id);

            const updatedCart: CartItem[] = existing
                ? cart.map((i: CartItem): CartItem => {
                      if (i.id === item.id) {
                          return {
                              ...i,
                              quantity: i.quantity + item.quantity,
                          };
                      } else {
                          return i;
                      }
                  })
                : [...cart, item];

            this.persistCart(updatedCart);

            return updatedCart;
        });
    }

    getAmountOf(id: string): number {
        return this.items().find((i) => i.id === id)?.quantity ?? 0;
    }

    getCart(): CartItem[] {
        return this.items();
    }

    pruneToExistingIds(existingProductIds: Set<string>): void {
        if (!this.isBrowser) {
            return;
        }

        const pruned = this.items().filter((item) =>
            existingProductIds.has(item.id),
        );

        if (pruned.length === this.items().length) {
            return;
        }

        this.items.set(pruned);
        this.persistCart(pruned);
    }
}
