import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-products',
    template: ` <div class="card"></div> `,
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
