import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductImageComponent } from './product-image.component';

describe('ProductImageComponent', () => {
    let fixture: ComponentFixture<ProductImageComponent>;

    const productImage = {
        id: '9feb793e-7c2c-453d-89e2-1975e67bddef',
        url: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg',
        alternative_text: 'Fender Player II Strat RW BCG - Front',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductImageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductImageComponent);
        fixture.componentRef.setInput('productImage', productImage);
        fixture.componentRef.setInput('height', 200);
        fixture.componentRef.setInput('width', 300);
        fixture.detectChanges();
    });

    it('renders the product image with source, alt text and dimensions', () => {
        const component = fixture.nativeElement as HTMLElement;
        const image = component.querySelector(
            '.product-image',
        ) as HTMLImageElement;

        expect(image).toBeTruthy();
        expect(image.getAttribute('ng-img')).not.toBeNull();
        expect(image.getAttribute('src')).toContain(productImage.url);
        expect(image.getAttribute('alt')).toBe(productImage.alternative_text);
        expect(image.getAttribute('height')).toBe('200');
        expect(image.getAttribute('width')).toBe('300');
    });
});
