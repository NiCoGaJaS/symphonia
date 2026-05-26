import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_ORIGIN } from '@api/api.config';
import { Observable } from 'rxjs';
import { Role } from './role.model';

@Injectable({ providedIn: 'root' })
export class Authentication {
    private readonly http = inject(HttpClient);
    private readonly base = `${inject(API_ORIGIN)}/auth`;

    login(email: string, password: string): Observable<LoginResponse> {
        const url = `${this.base}/login`;

        const body = new HttpParams()
            .set('email', email)
            .set('password', password);

        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        };

        return this.http.post<LoginResponse>(url, body, options);
    }

    logout(): Observable<void> {
        const url = `${this.base}/logout`;

        const options = {
            withCredentials: true,
        };

        return this.http.post<void>(url, {}, options);
    }
}

export interface LoginResponse {
    id: string;
    role: Role;
}
