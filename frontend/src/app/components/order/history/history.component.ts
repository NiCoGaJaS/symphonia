import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GetOrderListResponse, Orders } from '@api/products/orders.api';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { PageResponse } from '@api/paging.models';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-order-history',
    imports: [TableModule, RouterLink, DatePipe],
    providers: [MessageService, ConfirmationService],
    templateUrl: './history.component.html',
    styleUrl: './history.component.css',
})
export class HistoryComponent {
    private readonly orders = inject(Orders);
    private readonly cdr = inject(ChangeDetectorRef);

    protected readonly DEFAULT_ITEMS_PER_PAGE = 25;

    protected page: PageResponse<GetOrderListResponse> | undefined;
    protected items: GetOrderListResponse[] = [];
    protected loading = false;

    protected lastEvent: TableLazyLoadEvent | null = null;

    protected loadProducts(event: TableLazyLoadEvent): void {
        this.lastEvent = event;
        const size = event.rows ?? this.DEFAULT_ITEMS_PER_PAGE;
        const page = (event.first ?? 0) / size;

        this.loading = true;
        this.orders.list(page, size).subscribe({
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
}
