import { Component, computed, inject, Signal } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from '@components/order/summary/summary.component';
import { TableComponent } from '@components/order/table/table.component';
import { Cart } from '@api/cart/cart.store';
import {
    CartProductsSignals,
    createCartProductsSignals,
} from '@components/order/order-products';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [
        FormsModule,
        ConfirmDialogModule,
        TableComponent,
        SummaryComponent,
    ],
})
export class CartComponent {
    private readonly cart = inject(Cart);

    private readonly cartSignals: CartProductsSignals =
        createCartProductsSignals(this.cart);

    readonly totalPrice: Signal<number> = this.cartSignals.totalPrice;

    readonly isCartEmpty = computed(() => this.cart.getAmount() === 0);
}
