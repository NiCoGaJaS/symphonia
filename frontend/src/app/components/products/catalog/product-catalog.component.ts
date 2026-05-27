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
         map((params) => {
            const query = params.get('query');
            const category = params.get('category');
            const priceMinStr = params.get('price_min');
            const priceMaxStr = params.get('price_max');

            const toNum = (v: string | null) => v !== null && !Number.isNaN(Number(v)) ? Number(v) : null;

            return {query, category, priceMin: toNum(priceMinStr), priceMax: toNum(priceMaxStr)};
        }),
        switchMap(({query, category, priceMin, priceMax}) => this.products.search(query, category, priceMin, priceMax)),
    );
    readonly title = input.required<string>();
}
