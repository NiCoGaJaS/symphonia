import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_ORIGIN } from '@api/api.config';
import { Observable } from 'rxjs';
import { PageResponse } from '@app/api/paging.models';

@Injectable({ providedIn: 'root' })
export class Products {
    private readonly http = inject(HttpClient);
    private readonly base = inject(API_ORIGIN);

    search(query: string | null): Observable<GetProductResponse[]> {
        const url = `${this.base}/api/products`;

        let params = new HttpParams();
        if (query) {
            params = params.set('query', query);
        }

        return this.http.get<GetProductResponse[]>(url, { params: params });
    }

    detailsOf(id: string): Observable<GetProductDetailResponse> {
        const url = `${this.base}/api/products/${id}`;
        return this.http.get<GetProductDetailResponse>(url);
    }

    getAdminProducts(
        page: number,
        size: number,
    ): Observable<PageResponse<GetProductAdminResponse>> {
        const url = `${this.base}/api/admin/products`;
        const params = new HttpParams().set('page', page).set('size', size);

        return this.http.get<PageResponse<GetProductAdminResponse>>(url, {
            params: params,
        });
    }

    delete(id: string): Observable<void> {
        const url = `${this.base}/api/admin/products/${id}`;
        return this.http.delete<void>(url);
    }
}

export enum Category {
    GUITAR = 'GUITAR',
    PIANO = 'PIANO',
    DRUMS = 'DRUMS',
    VINYL = 'VINYL',
    EXTRA = 'EXTRA',
    OTHER = 'OTHER',
}

const LABELS: Record<Category, string> = {
    [Category.GUITAR]: 'Gitarre',
    [Category.PIANO]: 'Klavier',
    [Category.DRUMS]: 'Schlagzeug',
    [Category.VINYL]: 'Schallplatten',
    [Category.EXTRA]: 'Zubehör',
    [Category.OTHER]: 'Andere',
};

export function categoryToLabel(category: Category | null | undefined): string {
    if (!category) {
        return '';
    }

    return LABELS[category] ?? category;
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

export interface GetProductAdminResponse {
    id: string;
    name: string;
    category: Category;
    price: number;
    image: {
        id: string;
        url: string;
        alternative_text: string;
    };
}
