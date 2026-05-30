import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GetProductResponse, Products } from '@api/products/products.api';
import { API_ORIGIN } from '@api/api.config';
import { Cart } from '@api/cart/cart.store';
import { CheckoutComponent } from './checkout.component';
import { createCart } from '@components/order/order-test.utils';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('CheckoutComponent', () => {
    let fixture: ComponentFixture<CheckoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CheckoutComponent],
            providers: [
                { provide: API_ORIGIN, useValue: 'http://localhost:8080' },
                provideRouter([]),
                {
                    provide: Cart,
                    useValue: createCart([]),
                },
                {
                    provide: Products,
                    useValue: {
                        search: () => of([] as GetProductResponse[]),
                    } satisfies Partial<Products>,
                },
                MessageService,
                ConfirmationService,
            ],
        }).compileComponents();
    });

    it('uses table and summary in checkout variant', async () => {
        const products: GetProductResponse[] = [
            {
                id: 'p1',
                name: 'Product 1',
                price: 10,
                image: {
                    id: 'img1',
                    url: 'https://example.com/1.png',
                    alternative_text: 'Alt 1',
                },
            },
        ];

        TestBed.overrideProvider(Cart, {
            useValue: createCart([{ id: 'p1', quantity: 2 }]),
        });
        TestBed.overrideProvider(Products, {
            useValue: {
                search: () => of(products),
            } satisfies Partial<Products>,
        });

        fixture = TestBed.createComponent(CheckoutComponent);
        fixture.detectChanges();

        await fixture.whenStable();
        fixture.detectChanges();

        const host: HTMLElement = fixture.nativeElement;

        expect(host.querySelector('app-products-table')).not.toBeNull();
        expect(host.querySelector('app-products-summary')).not.toBeNull();

        expect(host.querySelector('.cart-amount-controls')).toBeNull();
        expect(host.querySelector('.cart-remove-product')).toBeNull();

        expect(host.querySelector('.cart-button-submit')).toBeNull();
        expect(host.textContent).not.toContain('Zur Kasse');
    });
});
