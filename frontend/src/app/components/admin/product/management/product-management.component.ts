import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
    GetProductAdminResponse,
    Products,
    categoryToLabel,
} from '@app/api/products/products.api';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PageResponse } from '@app/api/paging.models';
import { PriceTagComponent } from '@components/global/price-tag/price-tag.component';
import { ProductImageComponent } from '@components/products/image/product-image.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-management',
    imports: [
        TableModule,
        ProductImageComponent,
        RouterLink,
        PriceTagComponent,
        ConfirmDialogModule,
    ],
    templateUrl: './product-management.component.html',
    styleUrl: './product-management.component.css',
    providers: [ConfirmationService, MessageService],
})
export class ProductManagement {
    private readonly confirmation = inject(ConfirmationService);
    private readonly messages = inject(MessageService);

    private readonly products = inject(Products);
    private readonly cdr = inject(ChangeDetectorRef);

    protected readonly categoryToLabel = categoryToLabel;
    protected readonly DEFAULT_ITEMS_PER_PAGE = 25;

    protected page: PageResponse<GetProductAdminResponse> | undefined;
    protected items: GetProductAdminResponse[] = [];
    protected loading = false;

    protected lastEvent: TableLazyLoadEvent | null = null;

    protected loadProducts(event: TableLazyLoadEvent): void {
        this.lastEvent = event;
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

    protected confirmDelete(event: PointerEvent, id: string): void {
        this.confirmation.confirm({
            target: event.target as HTMLElement,
            message:
                'Möchten Sie dieses Produkt wirklich aus dem Shop löschen?',
            header: 'Produkt löschen',
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Abbrechen',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Löschen',
                severity: 'danger',
            },

            accept: () => {
                this.products.delete(id).subscribe({
                    next: () => {
                        this.confirmation.close();
                        this.messages.add({
                            severity: 'success',
                            summary: 'Produkt gelöscht',
                            detail: 'Das Produkt wurde erfolgreich aus dem Shop gelöscht.',
                        });

                        if (this.lastEvent) {
                            this.loadProducts(this.lastEvent);
                        }
                    },
                    error: () => {
                        this.confirmation.close();
                        this.messages.add({
                            severity: 'error',
                            summary: 'Löschen fehlgeschlagen',
                            detail: 'Das Produkt konnte nicht gelöscht werden. Bitte versuchen Sie es erneut.',
                        });

                        if (this.lastEvent) {
                            this.loadProducts(this.lastEvent);
                        }
                    },
                });
            },
            reject: () => {
                this.confirmation.close();
            },
        });
    }
}
