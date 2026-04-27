import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Products {
    private readonly http = inject(HttpClient);
    private readonly url = 'http://localhost:8080/api/products';

    all(): Observable<Product[]> {
        return this.http.get<Product[]>(this.url);
    }

    byId(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.url}/${id}`);
    }
}

export interface Product {
    id: string;
    name: string;
    price: number;
    short_description: string;
    description: string;
    image: ProductImage;
}

export interface ProductImage {
    id: string;
    url: string;
    alternative_text: string;
}
