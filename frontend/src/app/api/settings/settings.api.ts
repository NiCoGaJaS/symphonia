import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Settings {
    private readonly http = inject(HttpClient);
    private readonly base = 'http://localhost:8080/api/settings';

    get(): Observable<GetSettingsResponse> {
        const url = `${this.base}`;
        return this.http.get<GetSettingsResponse>(url);
    }

    name(firstName: string | null, lastName: string | null): Observable<void> {
        const url = `${this.base}/name`;

        const body = {
            first_name: firstName,
            last_name: lastName,
        };

        return this.http.put<void>(url, body);
    }

    payment(holder: string | null, iban: string | null): Observable<void> {
        const url = `${this.base}/payment`;

        const body = {
            holder: holder,
            iban: iban,
        };

        return this.http.put<void>(url, body);
    }

    shipping(address: Address | null): Observable<void> {
        const url = `${this.base}/shipping`;

        const body = address ?? {
            first_name: null,
            last_name: null,
            city: null,
            postal_code: null,
            street: null,
            house_number: null,
        };

        return this.http.put<void>(url, body);
    }

    billing(address: Address | null): Observable<void> {
        const url = `${this.base}/billing`;

        const body = address ?? {
            first_name: null,
            last_name: null,
            city: null,
            postal_code: null,
            street: null,
            house_number: null,
        };

        return this.http.put<void>(url, body);
    }
}

export interface GetSettingsResponse {
    first_name: string | null;
    last_name: string | null;
    payment: {
        holder: string,
        iban: string
    } | null;
    shipping: Address | null;
    billing: Address | null;
}

export interface Address {
    first_name: string,
    last_name: string,
    city: string,
    postal_code: string,
    street: string,
    house_number: string
}
