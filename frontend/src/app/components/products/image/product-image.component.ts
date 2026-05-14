import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-product-image',
    imports: [NgOptimizedImage],
    templateUrl: './product-image.component.html',
    styleUrls: ['./product-image.component.css', '../products.css'],
})
export class ProductImageComponent {
    readonly productImage = input.required<{
        url: string;
        alternative_text: string;
    }>();

    readonly height = input.required<number>();
    readonly width = input.required<number>();
}
