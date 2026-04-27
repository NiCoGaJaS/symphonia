import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Divider } from 'primeng/divider';
import { Product } from '@app/api/products/products.api';

@Component({
    selector: 'app-product-detail-general',
    imports: [DecimalPipe, Divider],
    templateUrl: './general.component.html',
    styleUrls: [
        './general.component.css',
        '../../products.css',
        '../../../../../styles.css',
    ],
})
export class GeneralComponent {
    readonly product = input.required<Product>();
}
