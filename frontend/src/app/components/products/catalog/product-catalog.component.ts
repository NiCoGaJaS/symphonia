import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GetProductResponse, Products } from '@api/products/products.api';
import { Observable } from 'rxjs';
import {ProductImageComponent} from '@components/products/image/product-image.component';

@Component({
    selector: 'app-product-catalog',
    templateUrl: 'product-catalog.component.html',
    imports: [AsyncPipe, DecimalPipe, RouterLink, ProductImageComponent],
    styleUrl: 'product-catalog.component.css',
})
export class ProductCatalog {
    readonly products: Observable<GetProductResponse[]> =
        inject(Products).all();
}
