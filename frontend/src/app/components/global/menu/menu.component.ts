import {Component, OnInit} from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MegaMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent implements OnInit {
  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Category I',
        icon: 'pi pi-question',
        items: [
          [
            {
              label: 'Category I',
              items: [
                { label: 'Item', routerLink: '/' },
                { label: 'Item', routerLink: '/' }
              ]
            }
          ]
        ]
      },
      {
        label: 'Category II',
        icon: 'pi pi-question',
        items: [
          [
            {
              label: 'Category II',
              items: [
                { label: 'Item', routerLink: '/' },
                { label: 'Item', routerLink: '/' }
              ]
            }
          ]
        ]
      },
    ];
  }

}

