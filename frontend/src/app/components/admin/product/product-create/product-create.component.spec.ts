import { ComponentFixture, TestBed } from '@angular/core/testing';
import { API_ORIGIN } from '@api/api.config';
import { MessageService } from 'primeng/api';
import { ProductCreateComponent } from './product-create.component';

describe('ProductCreateComponent', () => {
    let component: ProductCreateComponent;
    let fixture: ComponentFixture<ProductCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductCreateComponent],
            providers: [
                { provide: API_ORIGIN, useValue: 'http://localhost:3000' },
                MessageService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
