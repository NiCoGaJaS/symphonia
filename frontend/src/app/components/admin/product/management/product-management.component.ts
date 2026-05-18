import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
    GetProductAdminResponse,
    Products,
    categoryToLabel,
} from '@app/api/products/products.api';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { PageResponse } from '@app/api/paging.models';
import { ProductImageComponent } from '@components/products/image/product-image.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-management',
    imports: [TableModule, ProductImageComponent, RouterLink],
    templateUrl: './product-management.component.html',
    styleUrl: './product-management.component.css',
})
export class ProductManagement {
    private products = inject(Products);
    private cdr = inject(ChangeDetectorRef);

    protected readonly DEFAULT_ITEMS_PER_PAGE = 25;

    protected page: PageResponse<GetProductAdminResponse> | undefined;
    protected items: GetProductAdminResponse[] = [];
    protected loading = false;

    protected loadProducts(event: TableLazyLoadEvent): void {
        const size = event.rows ?? this.DEFAULT_ITEMS_PER_PAGE;
        const page = (event.first ?? 0) / size;

        this.loading = true;
        this.products.getAdminProducts(page, size).subscribe({
            next: (page) => {
                this.page = page;
                this.items = page.content;
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.loading = false;
                this.cdr.markForCheck();
            },
        });
    }

    protected readonly categoryToLabel = categoryToLabel;
}
