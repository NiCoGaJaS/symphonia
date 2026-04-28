import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '@app/api/products/products.api';

@Component({
    selector: 'app-product-detail-image',
    imports: [NgOptimizedImage],
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css', '../../products.css'],
})
export class ImageComponent {
    readonly product = input.required<Product>();
}
