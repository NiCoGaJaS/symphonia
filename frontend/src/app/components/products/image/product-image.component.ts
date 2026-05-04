import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProductImage } from '@app/api/products/products.api';

@Component({
    selector: 'app-product-image',
    imports: [NgOptimizedImage],
    templateUrl: './product-image.component.html',
    styleUrls: ['./product-image.component.css', '../products.css'],
})
export class ProductImageComponent {
    readonly productImage = input.required<ProductImage>();

    readonly height = input.required<number>();
    readonly width = input.required<number>();
}
