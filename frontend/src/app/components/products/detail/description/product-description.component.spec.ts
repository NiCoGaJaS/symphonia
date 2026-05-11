import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescriptionComponent } from './product-description.component';
import { Product } from '@app/api/products/products.api';

describe('DescriptionComponent', () => {
    let component: DescriptionComponent;
    let fixture: ComponentFixture<DescriptionComponent>;

    const product: Product = {
        id: '719b96f7-fcd4-4dce-85a0-9440d4bc6e62',
        name: 'Fender Player II Strat RW BCG',
        price: 772,
        summary: 'Short description',
        description: 'Description',
        category: 'Keine',
        image: {
            id: '9feb793e-7c2c-453d-89e2-1975e67bddef',
            url: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg',
            alternative_text: 'Fender Player II Strat RW BCG - Front',
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DescriptionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DescriptionComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('product', product);
        fixture.detectChanges();
    });

    it('builds the description tabs from the product data', () => {
        expect(component.tabs).toEqual([
            {
                key: 'description',
                title: 'Produktbeschreibung',
                content: product.description,
            },
            {
                key: 'technical',
                title: 'Technische Daten',
                content: 'n/a',
            },
            {
                key: 'rating',
                title: 'Bewertungen',
                content: 'n/a',
            },
            {
                key: 'shipping',
                title: 'Versand & Rückgabe',
                content: 'n/a',
            },
        ]);
    });

    it('renders the tab labels and the description content', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        expect(compiled.textContent).toContain('Produktbeschreibung');
        expect(compiled.textContent).toContain('Technische Daten');
        expect(compiled.textContent).toContain('Bewertungen');
        expect(compiled.textContent).toContain('Versand & Rückgabe');
        expect(compiled.textContent).toContain(product.description);
    });
});
