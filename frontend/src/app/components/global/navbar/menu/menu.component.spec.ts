import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MenuComponent],
            providers: [provideRouter(routes)],
        }).compileComponents();

        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
