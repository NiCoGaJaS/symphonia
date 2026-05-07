import { Component, inject } from '@angular/core';
import {
    GetProductDetailResponse,
    Products,
} from '@app/api/products/products.api';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { DescriptionComponent } from '@components/products/detail/description/product-description.component';
import { Observable } from 'rxjs';
import { ProductImageComponent } from '@components/products/image/product-image.component';
import { ProductInfoComponent } from './info/product-info.component';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'app-product-detail',
    imports: [
        TabsModule,
        DescriptionComponent,
        ProductInfoComponent,
        AsyncPipe,
        ProductImageComponent,
    ],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css',
    standalone: true,
})
export class ProductDetailComponent {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly products = inject(Products);

    readonly id: string = this.activatedRoute.snapshot.paramMap.get('id')!;
    readonly product: Observable<GetProductDetailResponse> =
        this.products.detailsOf(this.id);
}
