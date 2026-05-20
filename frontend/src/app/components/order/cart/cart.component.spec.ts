import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetProductResponse, Products } from '@app/api/products/products.api';
import { Cart } from '@app/api/cart/cart.store';
import { CartComponent } from './cart.component';
import { createCart } from '@components/order/order-test.utils';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('CartComponent', () => {
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CartComponent],
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

    it('renders the cart table and summary', () => {
        fixture = TestBed.createComponent(CartComponent);
        fixture.detectChanges();

        const host: HTMLElement = fixture.nativeElement;
        expect(host.querySelector('app-products-table')).not.toBeNull();
        expect(host.querySelector('app-products-summary')).not.toBeNull();
    });
});
