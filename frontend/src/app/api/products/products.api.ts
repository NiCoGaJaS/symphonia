import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class Products {
    private readonly http = inject(HttpClient);
    private readonly base;

    constructor() {
        if (isPlatformServer(inject(PLATFORM_ID))) {
            this.base = 'http://backend:8080'
        } else {
            this.base = 'http://localhost:8080'
        }
    }

    all(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.base}/api/products`);
    }
}

export interface Product {
    id: string;
    name: string;
    price: number;
    image: ProductImage;
}

export interface ProductImage {
    id: string;
    url: string;
    alternative_text: string;
}
