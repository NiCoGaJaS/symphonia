import { Component } from '@angular/core';
import { ProductCatalog } from '@components/products/catalog/product-catalog.component';

@Component({
    selector: 'app-home',
    imports: [ProductCatalog],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
