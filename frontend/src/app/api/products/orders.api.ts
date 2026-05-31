import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_ORIGIN } from '@api/api.config';
import { Observable } from 'rxjs';
import { PageResponse } from '@api/paging.models';

@Injectable({ providedIn: 'root' })
export class Orders {
    private readonly http = inject(HttpClient);
    private readonly base = inject(API_ORIGIN);

    getDetails(id: string): Observable<GetOrderDetailResponse> {
        const url = `${this.base}/api/products/order/${id}`;

        console.log(url);

        return this.http.get<GetOrderDetailResponse>(url);
    }

    getOrderList(
        page: number,
        size: number,
    ): Observable<PageResponse<GetOrderListResponse>> {
        const url = `${this.base}/api/products/orders`;
        const params = new HttpParams().set('page', page).set('size', size);

        return this.http.get<PageResponse<GetOrderListResponse>>(url, {
            params: params,
        });
    }

    submit(order: OrderRequest): Observable<void> {
        const url = `${this.base}/api/products/order`;
        return this.http.post<void>(url, order);
    }
}

export interface GetOrderDetailResponse {
    id: string;
    timestamp: string;
    products: {
        id: string;
        name: string;
        image: {
            id: string;
            url: string;
            alternative_text: string;
        };
        price: number;
        amount: number;
    }[];
    shipping: Address;
    payment: PaymentDetails;
    billing: Address | null;
}

export interface GetOrderListResponse {
    id: string;
    timestamp: string;
    price: number;
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
