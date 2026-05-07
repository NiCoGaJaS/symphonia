import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetProductDetailResponse } from '@app/api/products/products.api';
import { ProductInfoComponent } from './product-info.component';

describe('GeneralComponent', () => {
    let fixture: ComponentFixture<ProductInfoComponent>;

    const product: GetProductDetailResponse = {
        id: '719b96f7-fcd4-4dce-85a0-9440d4bc6e62',
        name: 'Fender Player II Strat RW BCG',
        price: 772,
        summary: 'Short description',
        description: 'Description',
        image: {
            id: '9feb793e-7c2c-453d-89e2-1975e67bddef',
            url: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg',
            alternative_text: 'Fender Player II Strat RW BCG - Front',
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductInfoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductInfoComponent);
        fixture.componentRef.setInput('product', product);
        fixture.detectChanges();
    });

    it('renders the product name, summary and formatted price', () => {
        const component = fixture.nativeElement as HTMLElement;

        expect(
            component.querySelector('.product-name')?.textContent?.trim(),
        ).toBe(product.name);
        expect(component.textContent).toContain(product.summary);
        expect(
            component.querySelector('.product-price')?.textContent?.trim(),
        ).toBe('772.00€');
    });

    it('shows the static order information and call to action', () => {
        const component = fixture.nativeElement as HTMLElement;

        expect(component.textContent).toContain('Kostenloser Versand');
        expect(component.textContent).toContain('1-3 Tage Lieferzeit');
        expect(component.textContent).toContain('Hochwertige Verarbeitung');
        expect(component.textContent).toContain('Sofort lieferbar');
        expect(
            component.querySelector('.product-order')?.textContent?.trim(),
        ).toBe('In den Warenkorb');
    });
});
