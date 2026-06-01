import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailDataComponent } from './order-detail-data.component';

describe('OrderDetailDataComponent', () => {
    let component: OrderDetailDataComponent;
    let fixture: ComponentFixture<OrderDetailDataComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderDetailDataComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderDetailDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
