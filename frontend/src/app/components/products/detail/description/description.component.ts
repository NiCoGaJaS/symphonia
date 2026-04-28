import { Component, OnInit, input } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Product } from '@app/api/products/products.api';

type TabType = {
    title: string;
    value: string;
    content: string;
};

@Component({
    selector: 'app-product-detail-description',
    imports: [Tab, TabList, TabPanel, TabPanels, Tabs],
    templateUrl: './description.component.html',
    styleUrl: './description.component.css',
})
export class DescriptionComponent implements OnInit {
    readonly product = input.required<Product>();

    tabs: TabType[] = [];

    ngOnInit(): void {
        this.tabs = [
            {
                title: 'Produktbeschreibung',
                value: '0',
                content: `${this.product().description}`,
            },
            { title: 'Technische Daten', value: '1', content: 'n/a' },
            { title: 'Bewertungen', value: '2', content: 'n/a' },
            { title: 'Versand & Rückgabe', value: '3', content: 'n/a' },
        ];
    }
}
