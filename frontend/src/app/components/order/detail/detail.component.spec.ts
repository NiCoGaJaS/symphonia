import { ComponentFixture, TestBed } from '@angular/core/testing';
import { API_ORIGIN } from '@api/api.config';
import { OrderDetailComponent } from './detail.component';

describe('DetailComponent', () => {
    let component: OrderDetailComponent;
    let fixture: ComponentFixture<OrderDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderDetailComponent],
            providers: [
                { provide: API_ORIGIN, useValue: 'http://localhost:8080' },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
