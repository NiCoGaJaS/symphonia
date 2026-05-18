import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [Menubar],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit(): void {
        this.items = [
            {
                label: 'Gitarren',
            },
            {
                label: 'Klaviere',
            },
            {
                label: 'Drums',
            },
            {
                label: 'Schallplatten',
            },
            {
                label: 'Zubehör',
            },
        ];
    }
}
