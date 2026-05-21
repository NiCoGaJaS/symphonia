import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetProductResponse, Products } from '@api/products/products.api';
import { Cart } from '@api/cart/cart.store';
import { SummaryComponent } from './summary.component';
import { createCart } from '@components/order/order-test.utils';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('SummaryComponent', () => {
    let component: SummaryComponent;
    let fixture: ComponentFixture<SummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SummaryComponent],
            providers: [
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
            ],
        }).compileComponents();
    });

    it('should create', () => {
        fixture = TestBed.createComponent(SummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('updates total price when cart amounts change', async () => {
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

        const cart = createCart([{ id: 'p1', quantity: 1 }]);

        TestBed.overrideProvider(Cart, { useValue: cart });
        TestBed.overrideProvider(Products, {
            useValue: {
                search: () => of(products),
            } satisfies Partial<Products>,
        });

        fixture = TestBed.createComponent(SummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(component.cart.getAmountOf('p1')).toBe(1);
        expect(component.totalPrice()).toBe(10);

        component.cart.setAmountOf('p1', 3);
        fixture.detectChanges();
        expect(component.totalPrice()).toBe(30);

        component.cart.setAmountOf('p1', 1);
        fixture.detectChanges();
        expect(component.totalPrice()).toBe(10);

        component.cart.setAmountOf('p1', 0);
        fixture.detectChanges();
        expect(component.totalPrice()).toBe(0);
        expect(component.cartProducts()).toHaveSize(0);
    });
});
