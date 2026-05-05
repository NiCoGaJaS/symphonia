import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { ProductImageComponent } from '@components/products/image/product-image.component';
import { Products } from '@api/products/products.api';

@Component({
    selector: 'app-product-catalog',
    templateUrl: 'product-catalog.component.html',
    imports: [DecimalPipe, ProductImageComponent, RouterLink, AsyncPipe],
    styleUrl: 'product-catalog.component.css',
})
export class ProductCatalog {
    private readonly routes = inject(ActivatedRoute);
    private readonly products = inject(Products);

    protected readonly products$ = this.routes.queryParamMap.pipe(
        map((params) => params.get('query')),
        switchMap((query) => this.products.search(query)),
    );
    readonly title = input.required<string>();
}
