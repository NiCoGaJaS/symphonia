import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {
        const form = new FormGroup({
            email: new FormControl(''),
        });

        const formGroupDirective = new FormGroupDirective([], []);
        formGroupDirective.form = form;

        await TestBed.configureTestingModule({
            imports: [InputComponent],
            providers: [
                {
                    provide: FormGroupDirective,
                    useValue: formGroupDirective,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;

        component.form = form;
        component.field = 'email';
        component.label = 'E-Mail';

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
