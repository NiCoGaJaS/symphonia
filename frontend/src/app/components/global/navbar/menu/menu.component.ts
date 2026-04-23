import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [MegaMenuModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
    items: MegaMenuItem[] | undefined;

    ngOnInit(): void {
        this.items = [
            {
                label: 'Gitarren',
                items: [
                    [
                        {
                            items: [
                                { label: 'Item', routerLink: '/' },
                                { label: 'Item', routerLink: '/' },
                            ],
                        },
                    ],
                ],
            },
            {
                label: 'Klaviere',
                items: [
                    [
                        {
                            items: [
                                { label: 'Item', routerLink: '/' },
                                { label: 'Item', routerLink: '/' },
                            ],
                        },
                    ],
                ],
            },
            {
                label: 'Drums',
                items: [
                    [
                        {
                            items: [
                                { label: 'Item', routerLink: '/' },
                                { label: 'Item', routerLink: '/' },
                            ],
                        },
                    ],
                ],
            },
            {
                label: 'Schallplatten',
                items: [
                    [
                        {
                            items: [
                                { label: 'Item', routerLink: '/' },
                                { label: 'Item', routerLink: '/' },
                            ],
                        },
                    ],
                ],
            },
            {
                label: 'Zubehör',
                items: [
                    [
                        {
                            items: [
                                { label: 'Item', routerLink: '/' },
                                { label: 'Item2', routerLink: '/' },
                            ],
                        },
                    ],
                ],
            },
        ];
    }
}
