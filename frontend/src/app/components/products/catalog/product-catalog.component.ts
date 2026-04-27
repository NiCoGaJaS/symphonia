import { AsyncPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Product, Products } from '@app/api/products/products.api';
import { NavbarComponent } from '@components/global/navbar/navbar.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-catalog',
    templateUrl: 'product-catalog.component.html',
    imports: [AsyncPipe, NgOptimizedImage, DecimalPipe],
    styleUrl: 'product-catalog.component.css',
})
export class ProductCatalog {
    readonly products: Observable<Product[]> = inject(Products).all();

    private cachedProducts: Product[] = [];

    constructor() {
        this.products.subscribe((list) => {
            this.cachedProducts = list;
        });
    }

    readonly filteredProducts = computed(() => {
        const query = this.normalize(NavbarComponent.searchQuery());

        if (!query) {
            return this.cachedProducts;
        }

        return this.cachedProducts.filter((p) =>
            this.normalize(p.name).includes(query),
        );
    });

    private normalize(value: string): string {
        return value.toLowerCase().replace(/[^a-z0-9]/g, '');
    }
}
