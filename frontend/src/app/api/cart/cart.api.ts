import { Injectable, inject } from '@angular/core';
import { API_ORIGIN } from '@api/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartValidation {
    private readonly http = inject(HttpClient);
    private readonly base = inject(API_ORIGIN);

    invalidIds(ids: string[]): Observable<string[]> {
        const url = `${this.base}/api/cart/validate`;
        return this.http.post<string[]>(url, ids);
    }
}
