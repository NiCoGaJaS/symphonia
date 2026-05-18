import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CartValidation {
    private readonly http = inject(HttpClient);
    private readonly base: string;

    constructor() {
        if (isPlatformServer(inject(PLATFORM_ID))) {
            this.base = 'http://backend:8080';
        } else {
            this.base = 'http://localhost:8080';
        }
    }

    invalidIds(ids: readonly string[]): Observable<string[]> {
        return this.http.post<string[]>(`${this.base}/api/cart/validate`, ids);
    }
}
