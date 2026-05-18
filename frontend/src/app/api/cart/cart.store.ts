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

    private upsert(id: string, updater: (current: number) => number): void {
        this.items.update((cart) => {
            let updated: CartItem[];

            const existing = cart.find((i) => i.id === id);
            const quantity = updater(existing?.quantity ?? 0);

            if (quantity <= 0) {
                updated = cart.filter((i) => i.id !== id);
            } else if (existing) {
                updated = cart.map((i) =>
                    i.id === id ? { ...i, quantity: quantity } : i,
                );
            } else {
                updated = [...cart, { id, quantity: quantity }];
            }

            this.persistCart(updated);
            return updated;
        });
    }

    addToCart(item: CartItem): void {
        this.upsert(item.id, (q) => q + item.quantity);
    }

    getAmountOf(id: string): number {
        return this.items().find((i) => i.id === id)?.quantity ?? 0;
    }

    getItems(): CartItem[] {
        return this.items();
    }

    setAmountOf(id: string, quantity: number): void {
        this.upsert(id, () => quantity);
    }

    pruneToExistingIds(invalidProductIds: Set<string>): void {
        if (!this.isBrowser) {
            return;
        }

        const pruned = this.items().filter(
            (item) => !invalidProductIds.has(item.id),
        );

        if (pruned.length === this.items().length) {
            return;
        }

        this.items.set(pruned);
        this.persistCart(pruned);
    }
}
