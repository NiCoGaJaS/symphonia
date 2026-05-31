import {
    CartProduct,
    CartProductsSignals,
    createCartProductsSignals,
} from '@components/order/order-products';
import { Component, Input, Signal, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Cart } from '@api/cart/cart.store';
import { Divider } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { GetProductResponse } from '@api/products/products.api';
import { InputNumber } from 'primeng/inputnumber';
import { PriceTagComponent } from '@components/global/price-tag/price-tag.component';
import { ProductImageComponent } from '@components/products/image/product-image.component';

@Component({
    selector: 'app-products-table',
    imports: [
        Divider,
        InputNumber,
        PriceTagComponent,
        ProductImageComponent,
        FormsModule,
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
})
export class TableComponent {
    @Input() variant: 'cart' | 'checkout' = 'cart';

    private readonly confirmationService: ConfirmationService =
        inject(ConfirmationService);
    private readonly messageService: MessageService = inject(MessageService);

    readonly cart: Cart = inject(Cart);

    private readonly cartSignals: CartProductsSignals =
        createCartProductsSignals(this.cart);

    readonly cartProducts: Signal<CartProduct[]> =
        this.cartSignals.cartProducts;
    readonly products: Signal<GetProductResponse[]> = this.cartSignals.products;
    readonly totalPrice: Signal<number> = this.cartSignals.totalPrice;

    confirmDelete(event: Event, productId: string): void {
        this.confirmationService.confirm({
            target: event.target as HTMLElement,
            message:
                'Möchten Sie dieses Produkt wirklich aus dem Warenkorb entfernen?',
            header: 'Produkt entfernen',
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Abbrechen',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Entfernen',
                severity: 'danger',
            },

            accept: () => {
                this.cart.setAmountOf(productId, 0);

                this.confirmationService.close();

                this.messageService.add({
                    severity: 'success',
                    summary: 'Entfernt.',
                    detail: 'Produkt entfernt.',
                });
            },

            reject: () => {
                this.confirmationService.close();
            },
        });
    }
}
