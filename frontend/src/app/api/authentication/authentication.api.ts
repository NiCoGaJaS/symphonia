import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Authentication {

    private readonly http = inject(HttpClient);
    private readonly base = 'http://localhost:8080/auth'

    login(email: string, password: string): Observable<LoginResponse> {
        const url = `${this.base}/login`

        const body = new HttpParams()
            .set('email', email)
            .set('password', password);

        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true
        }

        return this.http.post<LoginResponse>(url, body, options);
    }

    logout(): Observable<void> {
        const url = `${this.base}/logout`;

        const options = {
            withCredentials: true
        }

        return this.http.post<void>(url, {}, options);
    }

}

export type Role = 'ROLE_ADMIN' | 'ROLE_CUSTOMER';

export interface LoginResponse {
    id: string;
    role: Role;
}
