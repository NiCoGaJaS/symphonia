import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-order-detail-data',
    imports: [],
    templateUrl: './order-detail-data.component.html',
    styleUrl: './order-detail-data.component.css',
})
export class OrderDetailDataComponent {
    @Input({ required: true }) data: string[][] = [];
    @Input({ required: true }) title: string = '';
}
