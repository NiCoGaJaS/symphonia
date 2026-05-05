import { Component, OnInit, input } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Product } from '@app/api/products/products.api';

type TabItem = {
    key: string;
    title: string;
    content: string;
};

@Component({
    selector: 'app-product-detail-description',
    imports: [Tab, TabList, TabPanel, TabPanels, Tabs],
    templateUrl: './product-description.component.html',
    styleUrl: './product-description.component.css',
})
export class DescriptionComponent implements OnInit {
    readonly product = input.required<Product>();

    tabs: TabItem[] = [];

    ngOnInit(): void {
        this.tabs = [
            {
                key: 'description',
                title: 'Produktbeschreibung',
                content: `${this.product().description}`,
            },
            { key: 'technical', title: 'Technische Daten', content: 'n/a' },
            { key: 'rating', title: 'Bewertungen', content: 'n/a' },
            { key: 'shipping', title: 'Versand & Rückgabe', content: 'n/a' },
        ];
    }
}
