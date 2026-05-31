import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { GetOrderDetailResponse, Orders } from '@api/products/orders.api';
import { Observable, map, shareReplay } from 'rxjs';
import {
    OrderTableComponent,
    ProductsTableItem,
} from '@components/order/order-table/order-table.component';
import { OrderDetailDataComponent } from '@components/order/detail/order-detail-data/order-detail-data.component';
import { SummaryComponent } from '@components/order/summary/summary.component';

@Component({
    selector: 'app-order-detail',
    imports: [
        OrderTableComponent,
        AsyncPipe,
        OrderDetailDataComponent,
        SummaryComponent,
        DatePipe,
    ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css',
})
export class OrderDetailComponent {
    private readonly orders = inject(Orders);

    protected details$!: Observable<GetOrderDetailResponse>;
    protected products$!: Observable<ProductsTableItem[]>;
    protected total$!: Observable<number>;

    @Input({ required: true })
    set id(value: string) {
        if (!value) {
            return;
        }

        const details$ = this.orders.getDetails(value).pipe(shareReplay(1));
        this.details$ = details$;

        this.products$ = details$.pipe(
            map((d) =>
                d.products.map(
                    (p): ProductsTableItem => ({
                        id: p.id,
                        name: p.name,
                        image: p.image,
                        price: Number(p.price ?? 0),
                        amount: Number(p.amount ?? 0),
                    }),
                ),
            ),
        );

        this.total$ = this.products$.pipe(
            map((products) =>
                products.reduce(
                    (sum, p) => sum + (p.price || 0) * (p.amount || 0),
                    0,
                ),
            ),
        );
    }
}
