import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class Products {
    private readonly http = inject(HttpClient);
    private readonly base;

    constructor() {
        if (isPlatformServer(inject(PLATFORM_ID))) {
            this.base = 'http://backend:8080';
        } else {
            this.base = 'http://localhost:8080';
        }
    }

    search(query: string | null): Observable<GetProductResponse[]> {
        let params = new HttpParams();
        if (query) {
            params = params.set('query', query);
        }

        return this.http.get<GetProductResponse[]>(`${this.base}/api/products`, { params: params });
    }

    detailsOf(id: string): Observable<GetProductDetailResponse> {
        return this.http.get<GetProductDetailResponse>(
            `${this.base}/api/products/${id}`,
        );
    }

}

export interface GetProductResponse {
    id: string;
    name: string;
    price: number;
    image: {
        id: string;
        url: string;
        alternative_text: string;
    };
}

export interface GetProductDetailResponse {
    id: string;
    name: string;
    price: number;
    summary: string;
    description: string;
    image: {
        id: string;
        url: string;
        alternative_text: string;
    };
}
