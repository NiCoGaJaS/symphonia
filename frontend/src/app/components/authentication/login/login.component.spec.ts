import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Router, provideRouter } from '@angular/router';
import { Login } from '@components/authentication/login/login.component';

describe('Login Component', () => {
    let component: Login;
    let fixture: ComponentFixture<Login>;

    let backend: HttpTestingController;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Login],
            providers: [provideHttpClientTesting(), provideRouter([])],
        }).compileComponents();

        backend = TestBed.inject(HttpTestingController);
        router = TestBed.inject(Router);

        localStorage.clear();

        fixture = TestBed.createComponent(Login);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        backend.verify();
    });

    it('should create login component', () => {
        expect(component).toBeTruthy();
    });

    it('should show validation message and disable button on invalid inputs', () => {
        component.onLogin();
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;

        const validation = compiled.querySelector('.form-validation');
        expect(validation).toBeTruthy();
        expect(validation!.textContent).toContain(
            'E-Mail-Adresse oder Passwort ungültig.',
        );

        const submitButton = compiled.querySelector(
            '.login-button',
        ) as HTMLButtonElement;
        expect(submitButton).toBeTruthy();
        expect(submitButton.disabled).toBeTrue();
    });

    it('should login to backend and store user information in local storage', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        const user = {
            email: 'customer@symphonia.de',
            password: '1234',
        };

        const email = compiled.querySelector('#email') as HTMLInputElement;
        expect(email).toBeTruthy();
        email.value = user.email;
        email.dispatchEvent(new Event('input'));

        const password = compiled.querySelector(
            '#password input',
        ) as HTMLInputElement;
        expect(password).toBeTruthy();
        password.value = user.password;
        password.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        const navigation = spyOn(router, 'navigate');

        const submitButton = compiled.querySelector(
            '.login-button',
        ) as HTMLButtonElement;
        expect(submitButton).toBeTruthy();
        submitButton.click();

        fixture.detectChanges();

        const call = backend.expectOne('http://localhost:8080/auth/login');
        expect(call.request.method).toBe('POST');
        expect(call.request.withCredentials).toBeTrue();

        const body = call.request.body.toString();
        expect(body).toContain(`email=${user.email}`);
        expect(body).toContain(`password=${user.password}`);

        const loginResponse = {
            id: '9fb05fe4-70f9-4509-a20e-e98cd040f01a',
            role: 'CUSTOMER',
        };
        call.flush(loginResponse);
        fixture.detectChanges();

        expect(localStorage.getItem('user')).toBe(
            JSON.stringify(loginResponse),
        );
        expect(navigation).toHaveBeenCalledWith(['/profile']);
    });
});
