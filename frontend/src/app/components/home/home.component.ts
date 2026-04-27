import { BannerComponent } from '@components/home/banner/banner.component';
import { Component } from '@angular/core';
import { ProductCatalog } from '@components/products/catalog/product-catalog.component';

@Component({
    selector: 'app-home',
    imports: [ProductCatalog, BannerComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
