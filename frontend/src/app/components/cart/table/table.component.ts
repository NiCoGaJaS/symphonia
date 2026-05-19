import { Cart, CartItem } from '@api/cart/cart.store';
import { Component, Input, computed, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GetProductResponse, Products } from '@api/products/products.api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Divider } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { PriceTagComponent } from '@components/global/price-tag/price-tag.component';
import { ProductImageComponent } from '@components/products/image/product-image.component';
import { toSignal } from '@angular/core/rxjs-interop';

type CartProduct = GetProductResponse & {
    quantity: number;
};

@Component({
    selector: 'app-products-table',
    imports: [
        ConfirmDialog,
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

    private readonly productsApi = inject(Products);
    private readonly confirmationService = inject(ConfirmationService);
    private readonly messageService = inject(MessageService);

    readonly cart = inject(Cart);

    readonly products = toSignal(this.productsApi.search(null), {
        initialValue: [] as GetProductResponse[],
    });

    private readonly productsMap = computed(() => {
        return new Map(
            this.products().map(
                (product: GetProductResponse): [string, GetProductResponse] => [
                    product.id,
                    product,
                ],
            ),
        );
    });

    readonly cartProducts = computed<CartProduct[]>(() =>
        this.cart
            .getItems()
            .map(({ id, quantity }: CartItem) => {
                const product = this.productsMap().get(id);

                return product
                    ? {
                          ...product,
                          quantity,
                      }
                    : null;
            })
            .filter((item): item is CartProduct => item !== null),
    );

    readonly totalPrice = computed(() =>
        this.cartProducts().reduce(
            (total, { price, quantity }) => total + price * quantity,
            0,
        ),
    );

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
                    severity: 'info',
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
