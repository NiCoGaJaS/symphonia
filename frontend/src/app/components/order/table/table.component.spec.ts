import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GetProductResponse, Products } from '@api/products/products.api';
import { Cart } from '@api/cart/cart.store';
import { TableComponent } from './table.component';
import { createCart } from '@components/order/order-test.utils';
import { of } from 'rxjs';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableComponent],
            providers: [
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
                ConfirmationService,
                MessageService,
            ],
        }).compileComponents();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('shows an empty-cart message when the cart is empty', async () => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain(
            'Dein Warenkorb ist leer.',
        );
    });

    it('filters unknown product ids and computes total price', async () => {
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
            {
                id: 'p2',
                name: 'Product 2',
                price: 5,
                image: {
                    id: 'img2',
                    url: 'https://example.com/2.png',
                    alternative_text: 'Alt 2',
                },
            },
        ];

        TestBed.overrideProvider(Cart, {
            useValue: createCart([
                { id: 'p1', quantity: 2 },
                { id: 'missing', quantity: 10 },
                { id: 'p2', quantity: 1 },
            ]),
        });
        TestBed.overrideProvider(Products, {
            useValue: {
                search: () => of(products),
            } satisfies Partial<Products>,
        });

        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(component.cartProducts().map((p) => p.id)).toEqual(['p1', 'p2']);
        expect(component.totalPrice()).toBe(25);
    });
});
