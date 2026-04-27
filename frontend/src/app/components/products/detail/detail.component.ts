import { Component, inject } from '@angular/core';
import { Product, Products } from '@app/api/products/products.api';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { DescriptionComponent } from '@components/products/detail/description/description.component';
import { GeneralComponent } from '@components/products/detail/general/general.component';
import { ImageComponent } from '@components/products/detail/image/image.component';
import { Observable } from 'rxjs';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'app-product-detail',
    imports: [
        TabsModule,
        DescriptionComponent,
        GeneralComponent,
        AsyncPipe,
        ImageComponent,
    ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css',
    standalone: true,
})
export class DetailComponent {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly products = inject(Products);

    readonly id: string = this.activatedRoute.snapshot.paramMap.get('id')!;
    readonly product: Observable<Product> = this.products.byId(this.id);
}
