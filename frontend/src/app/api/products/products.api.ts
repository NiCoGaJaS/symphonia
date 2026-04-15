import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Products {

    private readonly http = inject(HttpClient);
    private readonly url = 'http://localhost:8080/api/products';

    all(): Observable<Product[]> {
        return this.http.get<Product[]>(this.url);
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
