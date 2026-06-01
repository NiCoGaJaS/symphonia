import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Divider } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { GetProductResponse } from '@api/products/products.api';
import { InputNumber } from 'primeng/inputnumber';
import { PriceTagComponent } from '@components/global/price-tag/price-tag.component';
import { ProductImageComponent } from '@components/products/image/product-image.component';

export interface ProductsTableItem {
    id: string;
    name: string;
    image: GetProductResponse['image'];
    price: number;
    amount: number;
}

@Component({
    selector: 'app-order-table',
    imports: [
        Divider,
        ProductImageComponent,
        PriceTagComponent,
        FormsModule,
        InputNumber,
    ],
    templateUrl: './order-table.component.html',
    styleUrl: './order-table.component.css',
})
export class OrderTableComponent {
    @Input({ required: true }) products: ProductsTableItem[] = [];
    @Input() mode: 'editable' | 'readonly' = 'editable';
    @Input() emptyLabel = 'Keine Produkte.';

    @Output() quantityChange = new EventEmitter<{
        productId: string;
        amount: number;
    }>();

    @Output() remove = new EventEmitter<{ event: Event; productId: string }>();

    get isEmpty(): boolean {
        return !this.products || this.products.length === 0;
    }

    onQuantityChange(productId: string, amount: number | null): void {
        if (amount === null) {
            return;
        }
        this.quantityChange.emit({ productId, amount });
    }

    onRemoveClick(event: Event, productId: string): void {
        this.remove.emit({ event, productId });
    }

    getTotal(item: ProductsTableItem): number {
        return item.price * item.amount;
    }
}
