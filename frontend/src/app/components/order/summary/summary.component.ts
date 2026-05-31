import { Component, Input } from '@angular/core';
import { Divider } from 'primeng/divider';
import { NgClass } from '@angular/common';
import { PriceTagComponent } from '@components/global/price-tag/price-tag.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-products-summary',
    imports: [Divider, PriceTagComponent, RouterLink, NgClass],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.css',
})
export class SummaryComponent {
    @Input() variant: 'cart' | 'checkout' = 'cart';

    @Input({ required: true }) total = 0;

    @Input() disableCheckoutButton = false;
}
