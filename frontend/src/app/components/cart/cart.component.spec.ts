import { CartItem, CartService } from '@app/services/cart.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product, Products } from '@app/api/products/products.api';
import { CartComponent } from './cart.component';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('CartComponent', () => {
    let fixture: ComponentFixture<CartComponent>;

    function createCartService(cart: CartItem[]): CartService {
        const cartState = signal<CartItem[]>(cart);
        return {
            cart: cartState.asReadonly(),
            getAmountOf: (id: string) =>
                cartState().find((i) => i.id === id)?.quantity ?? 0,
        } as unknown as CartService;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CartComponent],
            providers: [
                {
                    provide: CartService,
                    useValue: createCartService([]),
                },
                {
                    provide: Products,
                    useValue: {
                        all: () => of([] as Product[]),
                    } satisfies Partial<Products>,
                },
            ],
        }).compileComponents();
    });

    it('shows an empty-cart message when the cart is empty', () => {
        fixture = TestBed.createComponent(CartComponent);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain(
            'Your cart is empty.',
        );
    });

    it('renders only products that exist in the catalog and computes total price', async () => {
        const products: Product[] = [
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

        TestBed.overrideProvider(CartService, {
            useValue: createCartService(cart),
        });
        TestBed.overrideProvider(Products, {
            useValue: { all: () => of(products) } satisfies Partial<Products>,
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
});
