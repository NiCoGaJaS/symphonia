import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [Menubar],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit { @Output()
    categorySelected = new EventEmitter();
    items: MenuItem[] | undefined;

    ngOnInit(): void {
        this.items = [
            {
                label: 'Gitarren',
                command: () => this.categorySelected.emit('GUITAR'),
            },
            {
                label: 'Klaviere',
                command: () => this.categorySelected.emit('PIANO'),
            },
            {
                label: 'Schlagzeuge',
                command: () => this.categorySelected.emit('DRUMS'),
            },
            {
                label: 'Schallplatten',
                command: () => this.categorySelected.emit('VINYL'),
            },
            {
                label: 'Zubehör',
                command: () => this.categorySelected.emit('EXTRA'),
            },
            {
                label: 'Anderes',
                command: () => this.categorySelected.emit('OTHER'),
            }
        ];
    }
}
