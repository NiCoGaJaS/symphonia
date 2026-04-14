import { Component } from '@angular/core';
import { DataviewLayoutDemo } from './products/products.component';

@Component({
    selector: 'app-home',
    imports: [DataviewLayoutDemo],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
