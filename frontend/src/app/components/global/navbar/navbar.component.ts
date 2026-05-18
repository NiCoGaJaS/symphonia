import { ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { BadgeDirective } from 'primeng/badge';
import { Cart } from '@app/services/cart.service';
import { Cart } from '@app/api/cart/cart.store';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { NgOptimizedImage } from '@angular/common';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'app-navbar',
    imports: [
        MenuComponent,
        RouterLink,
        ToggleSwitchModule,
        FormsModule,
        NgOptimizedImage,
        BadgeDirective,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    private readonly router = inject(Router);
    protected cart: Cart = inject(Cart);

    protected showSearch = false;

    @ViewChild('searchInput')
    set searchInput(input: ElementRef<HTMLInputElement>) {
        if (input) {
            input.nativeElement.focus();
        }
    }

    toggleSearch(): void {
        this.showSearch = !this.showSearch;
    }

    onSearch(query: string): void {
        query = query.trim();

        this.router.navigate(['/search'], {
            queryParams: {
                query: query,
            },
        });
    }
}
