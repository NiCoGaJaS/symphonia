import { Injectable, inject } from '@angular/core';
import { API_ORIGIN } from '@api/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Orders {
    private readonly http = inject(HttpClient);
    private readonly base = inject(API_ORIGIN);

    submit(order: OrderRequest): Observable<void> {
        const url = `${this.base}/api/products/order`;

        return this.http.post<void>(url, order);
    }
}

export interface OrderRequest {
    products: {
        id: string;
        amount: number;
    }[];
    shipping: Address;
    payment: PaymentDetails;
    billing: Address | null;
}

export interface Address {
    first_name: string;
    last_name: string;
    city: string;
    zipcode: string;
    street: string;
    house_number: string;
}

export interface PaymentDetails {
    holder: string;
    iban: string;
}
