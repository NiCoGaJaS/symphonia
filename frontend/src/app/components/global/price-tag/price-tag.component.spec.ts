import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTagComponent } from './price-tag.component';

describe('PriceTagComponent', () => {
    let fixture: ComponentFixture<PriceTagComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PriceTagComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PriceTagComponent);
    });

    it('renders the formatted price', () => {
        fixture.componentRef.setInput('price', 99);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent ?? '').toMatch(/99.00 €/);
    });

    it('shows tax hint by default and hides it when noTax=true', () => {
        fixture.componentRef.setInput('price', 10);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('inkl. MwSt.');

        fixture.componentRef.setInput('noTax', true);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).not.toContain('inkl. MwSt.');
    });

    it('aligns right when alignRight=true', () => {
        fixture.componentRef.setInput('price', 10);
        fixture.componentRef.setInput('alignRight', true);
        fixture.detectChanges();

        const wrapper: HTMLElement | null =
            fixture.nativeElement.querySelector('.cart-price-tax');
        expect(wrapper?.classList.contains('align-end')).toBeTrue();
    });

    it('bolds the price when priceBold=true', () => {
        fixture.componentRef.setInput('price', 10);
        fixture.componentRef.setInput('priceBold', true);
        fixture.detectChanges();

        const priceEl: HTMLElement | null = fixture.nativeElement.querySelector(
            '.cart-price-tax > p',
        );
        expect(priceEl?.classList.contains('text-bold')).toBeTrue();
    });
});
