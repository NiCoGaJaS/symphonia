import { Category, GetProductAdminResponse } from '@api/products/products.api';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { API_ORIGIN } from '@api/api.config';
import { PageResponse } from '@api/paging.models';
import { ProductManagement } from '@components/admin/product/management/product-management.component';
import { provideRouter } from '@angular/router';

describe('Product Management Component', () => {
    let component: ProductManagement;
    let fixture: ComponentFixture<ProductManagement>;

    let backend: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductManagement],
            providers: [
                { provide: API_ORIGIN, useValue: 'http://localhost:8080' },
                provideHttpClientTesting(),
                provideRouter([]),
            ],
        }).compileComponents();

        backend = TestBed.inject(HttpTestingController);

        fixture = TestBed.createComponent(ProductManagement);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        backend.verify();
    });

    it('should create product management component', () => {
        const page: PageResponse<GetProductAdminResponse> = {
            content: [],
            empty: true,
            first: true,
            last: true,
            number: 0,
            number_of_elements: 0,
            size: 0,
            total_elements: 0,
            total_pages: 0,
        };

        const call = backend.expectOne(
            'http://localhost:8080/api/admin/products?page=0&size=25',
        );
        expect(call.request.method).toBe('GET');
        call.flush(page);

        expect(component).toBeTruthy();
    });

    it('should load products', () => {
        const fender = {
            id: '719b96f7-fcd4-4dce-85a0-9440d4bc6e62',
            name: 'Fender Player II Strat RW BCG',
            price: 772,
            category: Category.GUITAR,
            image: {
                id: '9feb793e-7c2c-453d-89e2-1975e67bddef',
                url: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg',
                alternative_text: 'Fender Player II Strat RW BCG - Front',
            },
        };

        const products: PageResponse<GetProductAdminResponse> = {
            content: [fender],
            empty: false,
            first: true,
            last: true,
            number: 0,
            number_of_elements: 1,
            size: 1,
            total_elements: 1,
            total_pages: 1,
        };

        const call = backend.expectOne(
            'http://localhost:8080/api/admin/products?page=0&size=25',
        );
        expect(call.request.method).toBe('GET');
        call.flush(products);

        fixture.detectChanges();

        const element = fixture.nativeElement as HTMLElement;

        const title = element.querySelector('.caption > h1');
        expect(title).toBeTruthy();
        expect(title?.textContent).toContain('Produkte');

        const add = element.querySelector('.product-add');
        expect(add).toBeTruthy();
        expect(add?.textContent).toContain('Produkt hinzufügen');

        const headers = element.querySelector('.headers');
        expect(headers).toBeTruthy();

        const preview = element.querySelector('.product-preview');
        expect(preview).toBeTruthy();
        const image = preview?.querySelector('app-product-image');
        expect(image).toBeTruthy();
        expect(preview?.textContent).toContain(fender.name);

        const category = element.querySelector('.category-column');
        expect(category).toBeTruthy();
        expect(category?.textContent).toContain('Gitarre');

        const price = element.querySelector('.product-price');
        expect(price).toBeTruthy();

        const view = element.querySelector('.product-view');
        expect(view).toBeTruthy();

        const edit = element.querySelector('.product-edit');
        expect(edit).toBeTruthy();

        const deleteProduct = element.querySelector('.product-delete');
        expect(deleteProduct).toBeTruthy();
    });
});
