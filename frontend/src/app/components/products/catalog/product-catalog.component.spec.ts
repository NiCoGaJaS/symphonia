import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { GetProductResponse } from '@api/products/products.api';
import { ProductCatalog } from '@components/products/catalog/product-catalog.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('Product Catalog Component', () => {
    let harness: RouterTestingHarness;
    let backend: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductCatalog],
            providers: [
                provideHttpClientTesting(),
                provideRouter(
                    [
                        {
                            path: 'search',
                            component: ProductCatalog,
                            data: {
                                title: 'Produkte',
                            },
                        },
                    ],
                    withComponentInputBinding(),
                ),
            ],
        }).compileComponents();

        harness = await RouterTestingHarness.create();
        backend = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        backend.verify();
    });

    it('should create product catalog', async () => {
        const component = await harness.navigateByUrl(
            '/search',
            ProductCatalog,
        );

        const call = backend.expectOne('http://localhost:8080/api/products');
        expect(call.request.method).toBe('GET');
        expect(component).toBeTruthy();
    });

    it('shows no products found on empty response', async () => {
        await harness.navigateByUrl('/search', ProductCatalog);

        const call = backend.expectOne('http://localhost:8080/api/products');
        expect(call.request.method).toBe('GET');
        call.flush([]);

        harness.fixture.detectChanges();
        const compiled = harness.fixture.nativeElement as HTMLElement;

        const noProductsText = compiled.querySelector('.empty-products');
        expect(noProductsText).toBeTruthy();
        expect(noProductsText?.textContent).toContain(
            'Keine Produkte gefunden',
        );
    });

    it('shows products when backend returns data', async () => {
        await harness.navigateByUrl('/search', ProductCatalog);

        const product = {
            id: '719b96f7-fcd4-4dce-85a0-9440d4bc6e62',
            name: 'Fender Player II Strat RW BCG',
            price: 772,
            image: {
                id: '9feb793e-7c2c-453d-89e2-1975e67bddef',
                url: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg',
                alternative_text: 'Fender Player II Strat RW BCG - Front',
            },
        } as GetProductResponse;

        const call = backend.expectOne('http://localhost:8080/api/products');
        expect(call.request.method).toBe('GET');
        call.flush([product]);

        harness.fixture.detectChanges();
        const compiled = harness.fixture.nativeElement as HTMLElement;

        const products = compiled.querySelectorAll('.product');
        expect(products.length).toBe(1);

        const fender = products[0];
        expect(fender).toBeTruthy();
        expect(fender.querySelector('.product-name')?.textContent?.trim()).toBe(
            product.name,
        );
        expect(
            fender.querySelector('.product-price')?.textContent?.trim(),
        ).toBe('772.00 €');

        const image: HTMLImageElement | null =
            fender.querySelector('.product-image');
        expect(image).toBeTruthy();
        expect(image?.src).toBe(product.image.url);
        expect(image?.alt).toBe(product.image.alternative_text);
    });

    it('shows filtered products using query parameter', async () => {
        const query = 'Fender';
        await harness.navigateByUrl(`/search?query=${query}`, ProductCatalog);

        const call = backend.expectOne(
            `http://localhost:8080/api/products?query=${query}`,
        );
        expect(call.request.method).toBe('GET');
        expect(call.request.params.get('query')).toBe(query);
    });
});
