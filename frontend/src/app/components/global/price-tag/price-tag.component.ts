import { Component, Input, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-price-tag',
    imports: [DecimalPipe],
    templateUrl: './price-tag.component.html',
    styleUrl: './price-tag.component.css',
})
export class PriceTagComponent {
    readonly price = input.required<number>();

    @Input() alignRight = false;
    @Input() noTax = false;
    @Input() priceBold = false;
}
