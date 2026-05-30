import { Injectable, inject } from '@angular/core';
import { API_ORIGIN } from '@api/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Settings {
    private readonly http = inject(HttpClient);
    private readonly base = `${inject(API_ORIGIN)}/api/settings`;

    get(): Observable<GetSettingsResponse> {
        const url = `${this.base}`;
        return this.http.get<GetSettingsResponse>(url);
    }

    name(name: Name | null): Observable<void> {
        const url = `${this.base}/name`;
        return this.http.put<void>(url, name);
    }

    payment(payment: PaymentDetails | null): Observable<void> {
        const url = `${this.base}/payment`;
        return this.http.put<void>(url, payment);
    }

    shipping(address: Address | null): Observable<void> {
        const url = `${this.base}/shipping`;
        return this.http.put<void>(url, address);
    }

    billing(address: Address | null): Observable<void> {
        const url = `${this.base}/billing`;
        return this.http.put<void>(url, address);
    }
}

export interface GetSettingsResponse {
    first_name: string | null;
    last_name: string | null;
    payment: PaymentDetails | null;
    shipping: Address | null;
    billing: Address | null;
}

export interface Name {
    first_name: string;
    last_name: string;
}

export interface PaymentDetails {
    holder: string;
    iban: string;
}

export interface Address {
    first_name: string;
    last_name: string;
    city: string;
    zipcode: string;
    street: string;
    house_number: string;
}
