import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-products',
    template: `
        <div class="card">
            <p-dataView #dv [value]="products()" [layout]="layout">
                <ng-template #list let-items>
                    @for (
                        item of items;
                        track item.id;
                        let i = $index;
                        let first = $first
                    ) {
                        <div class="list-item" [class.border-top]="!first">
                            <div class="image-wrapper">
                                <img
                                    class="product-image"
                                    [src]="
                                        'https://primefaces.org/cdn/primeng/images/demo/product/' +
                                        item.image
                                    "
                                    [alt]="item.name"
                                />
                                <p-tag
                                    [value]="item.inventoryStatus"
                                    [severity]="getSeverity(item)"
                                    class="tag"
                                ></p-tag>
                            </div>

                            <div class="content">
                                <div class="left">
                                    <div>
                                        <span class="category">{{
                                            item.category
                                        }}</span>
                                        <div class="name">{{ item.name }}</div>
                                    </div>

                                    <div class="rating-box">
                                        <div class="rating">
                                            <span>{{ item.rating }}</span>
                                            <i class="pi pi-star-fill"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="right">
                                    <span class="price">{{ item.price }}</span>

                                    <div class="actions">
                                        <button
                                            type="button"
                                            pButton
                                            icon="pi pi-heart"
                                            [outlined]="true"
                                            aria-label="Zu Favoriten hinzufügen"
                                        ></button>
                                        <button
                                            type="button"
                                            pButton
                                            icon="pi pi-shopping-cart"
                                            label="Buy Now"
                                            [disabled]="
                                                item.inventoryStatus ===
                                                'OUTOFSTOCK'
                                            "
                                            aria-label="Zu Warenkorb hinzufügen"
                                        ></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </ng-template>

                <ng-template #grid let-items>
                    <div class="grid">
                        @for (product of items; track product) {
                            <div class="card-item">
                                <div class="image-box">
                                    <div class="image-inner">
                                        <img
                                            class="product-image"
                                            [src]="
                                                'https://primefaces.org/cdn/primeng/images/demo/product/' +
                                                product.image
                                            "
                                            [alt]="product.name"
                                        />
                                        <p-tag
                                            [value]="product.inventoryStatus"
                                            [severity]="getSeverity(product)"
                                            class="tag"
                                        ></p-tag>
                                    </div>
                                </div>

                                <div class="card-content">
                                    <div class="top">
                                        <div>
                                            <span class="category">{{
                                                product.category
                                            }}</span>
                                            <div class="name">
                                                {{ product.name }}
                                            </div>
                                        </div>

                                        <div class="rating-box">
                                            <div class="rating">
                                                <span>{{
                                                    product.rating
                                                }}</span>
                                                <i class="pi pi-star-fill"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="bottom">
                                        <span class="price">{{
                                            product.price
                                        }}</span>

                                        <div class="actions">
                                            <button
                                                type="button"
                                                pButton
                                                icon="pi pi-shopping-cart"
                                                label="Buy Now"
                                                [disabled]="
                                                    product.inventoryStatus ===
                                                    'OUTOFSTOCK'
                                                "
                                                aria-label="Zu Einkaufswagen hinzufügen"
                                            ></button>
                                            <button
                                                type="button"
                                                pButton
                                                icon="pi pi-heart"
                                                outlined
                                                aria-label="Zu Favoriten hinzufügen"
                                            ></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </ng-template>
            </p-dataView>
        </div>
    `,
    styleUrl: 'products.component.css',
    standalone: true,
    imports: [
        DataViewModule,
        SelectButtonModule,
        TagModule,
        ButtonModule,
        FormsModule,
    ],
})
export class DataviewLayoutDemo {
    layout: 'list' | 'grid' = 'grid';

    products = signal([
        {
            id: '1000',
            name: 'Bamboo Watch',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            inventoryStatus: 'INSTOCK',
            rating: 5,
        },
        {
            id: '1002',
            name: 'Blue Band',
            image: 'blue-band.jpg',
            price: 79,
            category: 'Fitness',
            inventoryStatus: 'LOWSTOCK',
            rating: 3,
        },
        {
            id: '1003',
            name: 'Red Sneakers',
            image: 'black-watch.jpg',
            price: 120,
            category: 'Fashion',
            inventoryStatus: 'OUTOFSTOCK',
            rating: 4,
        },
    ]);

    getSeverity(product: { inventoryStatus: string }): string | null {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return null;
        }
    }
}
