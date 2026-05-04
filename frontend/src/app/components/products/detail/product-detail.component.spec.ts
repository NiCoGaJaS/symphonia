import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product, Products } from '@app/api/products/products.api';
import { ProductDetailComponent } from './product-detail.component';
import { of } from 'rxjs';

describe('ProductDetailComponent', () => {
    let component: ProductDetailComponent;
    let fixture: ComponentFixture<ProductDetailComponent>;
    let detailsOf: jasmine.Spy;

    const product: Product = {
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
        detailsOf = jasmine.createSpy('detailsOf').and.returnValue(of(product));

        await TestBed.configureTestingModule({
            imports: [ProductDetailComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({ id: product.id }),
                        },
                    },
                },
                {
                    provide: Products,
                    useValue: {
                        detailsOf,
                    },
                },
            ],
        }).compileComponents();
    });

    function createComponent(): void {
        fixture = TestBed.createComponent(ProductDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    beforeEach(() => {
        createComponent();
    });

    it('loads the product by route id', () => {
        expect(component.id).toBe(product.id);
        expect(detailsOf).toHaveBeenCalledWith(product.id);
    });

    it('renders the product image, info and description components', async () => {
        await fixture.whenStable();
        await fixture.whenRenderingDone();
        fixture.detectChanges();

        const element = fixture.nativeElement as HTMLElement;

        expect(element.querySelector('.wrapper')).toBeTruthy();
        expect(element.querySelector('.top')).toBeTruthy();
        expect(element.querySelector('.image')).toBeTruthy();
        expect(element.querySelector('.text')).toBeTruthy();
        expect(element.querySelector('.details')).toBeTruthy();
        expect(element.querySelector('.not-found')).toBeNull();
    });

    it('shows a fallback message when the product is not found', async () => {
        detailsOf.and.returnValue(of(undefined as unknown as Product));

        createComponent();
        await fixture.whenStable();
        await fixture.whenRenderingDone();
        fixture.detectChanges();

        const element = fixture.nativeElement as HTMLElement;

        expect(element.querySelector('.not-found')?.textContent).toContain(
            'Produkt konnte nicht gefunden werden.',
        );
        expect(element.querySelector('app-product-image')).toBeNull();
        expect(element.querySelector('app-product-info')).toBeNull();
        expect(
            element.querySelector('app-product-detail-description'),
        ).toBeNull();
    });
});
