import { AsyncPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product, Products } from '@app/api/products/products.api';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-catalog',
    templateUrl: 'product-catalog.component.html',
    imports: [AsyncPipe, NgOptimizedImage, DecimalPipe],
    styleUrl: 'product-catalog.component.css',
})
export class ProductCatalog {
    readonly products: Observable<Product[]> = inject(Products).all();
}
