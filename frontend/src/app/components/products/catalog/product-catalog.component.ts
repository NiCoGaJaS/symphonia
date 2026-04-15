import {Component, inject} from '@angular/core';
import {Products, Product} from '@app/api/products/products.api';
import {AsyncPipe, DecimalPipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
    selector: 'product-catalog',
    templateUrl: 'product-catalog.component.html',
    imports: [
        AsyncPipe,
        NgForOf,
        NgOptimizedImage,
        DecimalPipe
    ],
    styleUrl: 'product-catalog.component.css'
})
export class ProductCatalog {

    readonly products: Observable<Product[]> = inject(Products).all();

}
