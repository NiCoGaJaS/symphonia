import { Component } from '@angular/core';
import { DataviewLayoutDemo } from './products/products.component';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-home',
    imports: [PaginatorModule, DataviewLayoutDemo],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
