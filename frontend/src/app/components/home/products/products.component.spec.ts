import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataviewLayoutDemo } from './products.component';

describe('ProductsComponent', () => {
    let component: DataviewLayoutDemo;
    let fixture: ComponentFixture<DataviewLayoutDemo>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DataviewLayoutDemo],
        }).compileComponents();

        fixture = TestBed.createComponent(DataviewLayoutDemo);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
