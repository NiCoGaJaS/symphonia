import { Component, effect, inject, input, signal } from '@angular/core';
import { API_ORIGIN } from '@api/api.config';
import { NgOptimizedImage } from '@angular/common';
import { ProductImage } from '@api/products/products.api';

@Component({
    selector: 'app-product-image',
    templateUrl: './product-image.component.html',
    styleUrls: ['./product-image.component.css', '../products.css'],
    imports: [NgOptimizedImage],
})
export class ProductImageComponent {
    private readonly base = inject(API_ORIGIN);

    readonly productImage = input.required<ProductImage>();

    readonly height = input.required<number>();
    readonly width = input.required<number>();

    protected readonly source = signal('');

    private readonly sourceEffect = effect(() => {
        const productImage = this.productImage();

        if (!productImage) {
            this.source.set('');
            return;
        }

        const url = productImage.url;

        if (url.startsWith('/')) {
            this.source.set(`${this.base}${url}`);
            return;
        }
        this.source.set(url);
    });
}
