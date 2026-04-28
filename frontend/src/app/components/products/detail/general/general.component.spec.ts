import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralComponent } from './general.component';
import { Product } from '@app/api/products/products.api';

describe('GeneralComponent', () => {
    let component: GeneralComponent;
    let fixture: ComponentFixture<GeneralComponent>;

    const product: Product = {
        id: '719b96f7-fcd4-4dce-85a0-9440d4bc6e62',
        name: 'Fender Player II Strat RW BCG',
        price: 772,
        short_description: 'Short description',
        description: 'Description',
        image: {
            id: '9feb793e-7c2c-453d-89e2-1975e67bddef',
            url: 'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg',
            alternative_text: 'Fender Player II Strat RW BCG - Front',
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GeneralComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GeneralComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('product', product);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
