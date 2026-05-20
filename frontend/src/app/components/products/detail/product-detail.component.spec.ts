import {
    ActivatedRoute,
    convertToParamMap,
    provideRouter,
} from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { API_ORIGIN } from '@api/api.config';
import { GetProductDetailResponse } from '@api/products/products.api';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
    let component: ProductDetailComponent;
    let fixture: ComponentFixture<ProductDetailComponent>;
    let backend: HttpTestingController;

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
            imports: [ProductDetailComponent],
            providers: [
                { provide: API_ORIGIN, useValue: 'http://localhost:8080' },
                provideHttpClient(withFetch()),
                provideHttpClientTesting(),
                provideRouter([]),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({ id: product.id }),
                        },
                    },
                },
            ],
        }).compileComponents();

        backend = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(ProductDetailComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    afterEach(() => {
        backend.verify();
    });

    it('loads the product by route id', () => {
        expect(component.id).toBe(product.id);

        const call = backend.expectOne(
            `http://localhost:8080/api/products/${product.id}`,
        );
        expect(call.request.method).toBe('GET');
    });

    it('renders the product image, info and description components', async () => {
        backend
            .expectOne(`http://localhost:8080/api/products/${product.id}`)
            .flush(product);

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
        backend
            .expectOne(`http://localhost:8080/api/products/${product.id}`)
            .flush(null);

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
