import { Cart, CartItem } from '@app/api/cart/cart.store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    GetProductDetailResponse,
    Products,
} from '@app/api/products/products.api';
import { computed, signal } from '@angular/core';
import { CartComponent } from './cart.component';
import { of } from 'rxjs';

function createCart(items: CartItem[]): Cart {
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
    } as unknown as Cart;
}

describe('CartComponent', () => {
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CartComponent],
            providers: [
                {
                    provide: Cart,
                    useValue: createCart([]),
                },
                {
                    provide: Products,
                    useValue: {
                        search: () => of([] as GetProductDetailResponse[]),
                    } satisfies Partial<Products>,
                },
            ],
        }).compileComponents();
    });

    it('shows an empty-cart message when the cart is empty', () => {
        fixture = TestBed.createComponent(CartComponent);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain(
            'Dein Warenkorb ist leer.',
        );
    });

    it('renders only products that exist in the catalog and computes total price', async () => {
        const products: GetProductDetailResponse[] = [
            {
                id: 'p1',
                name: 'Product 1',
                price: 10,
                summary: 'Summary',
                description: 'Description',
                image: {
                    id: 'img1',
                    url: 'https://example.com/1.png',
                    alternative_text: 'Alt 1',
                },
            },
            {
                id: 'p2',
                name: 'Product 2',
                price: 5,
                summary: 'Summary',
                description: 'Description',
                image: {
                    id: 'img2',
                    url: 'https://example.com/2.png',
                    alternative_text: 'Alt 2',
                },
            },
        ];

        const cart: CartItem[] = [
            { id: 'p1', quantity: 2 },
            { id: 'missing', quantity: 10 },
            { id: 'p2', quantity: 1 },
        ];

        TestBed.overrideProvider(Cart, {
            useValue: createCart(cart),
        });
        TestBed.overrideProvider(Products, {
            useValue: {
                search: () => of(products),
            } satisfies Partial<Products>,
        });

        fixture = TestBed.createComponent(CartComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Product 1');
        expect(fixture.nativeElement.textContent).toContain('Product 2');
        expect(fixture.nativeElement.textContent).not.toContain('missing');

        expect(fixture.nativeElement.textContent ?? '').toMatch(/25.00 €/);
    });

    it('increases and decreases the amount correctly', async () => {
        const products: GetProductDetailResponse[] = [
            {
                id: 'p1',
                name: 'Product 1',
                price: 10,
                summary: 'Summary',
                description: 'Description',
                image: {
                    id: 'img1',
                    url: 'https://example.com/1.png',
                    alternative_text: 'Alt 1',
                },
            },
        ];

        const cart = createCart([{ id: 'p1', quantity: 1 }]);

        TestBed.overrideProvider(Cart, {
            useValue: cart,
        });

        TestBed.overrideProvider(Products, {
            useValue: {
                search: () => of(products),
            } satisfies Partial<Products>,
        });

        fixture = TestBed.createComponent(CartComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const component = fixture.componentInstance;

        expect(component.cart.getAmountOf('p1')).toBe(1);
        expect(component.totalPrice()).toBe(10);

        component.cart.setAmountOf('p1', 3);
        fixture.detectChanges();

        expect(component.cart.getAmountOf('p1')).toBe(3);
        expect(component.totalPrice()).toBe(30);

        component.cart.setAmountOf('p1', 1);
        fixture.detectChanges();

        expect(component.cart.getAmountOf('p1')).toBe(1);
        expect(component.totalPrice()).toBe(10);

        component.cart.setAmountOf('p1', 0);
        fixture.detectChanges();

        expect(component.cart.getAmountOf('p1')).toBe(0);
        expect(component.cartProducts()).toHaveSize(0);
    });
});
