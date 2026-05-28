import {
    Component,
    ElementRef,
    PLATFORM_ID,
    ViewChild,
    inject,
} from '@angular/core';
import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BadgeDirective } from 'primeng/badge';
import { Cart } from '@app/api/cart/cart.store';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
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

    protected readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    protected cart: Cart = inject(Cart);
    protected showSearch = false;
    protected showFilters = false;

    private query: string = '';
    private category: string = '';
    protected priceMin: number = -1;
    protected priceMax: number = -1;

    @ViewChild('searchInput')
    set searchInput(input: ElementRef<HTMLInputElement>) {
        if (input) {
            input.nativeElement.focus();
        }
    }

    toggleSearch(): void {
        this.showSearch = !this.showSearch;
    }

    toggleFilters(): void {
        this.showFilters = !this.showFilters;
    }

    onSearch(query: string): void {
        this.query = query.trim();
        this.route();
    }

    onCategorySelected(category: string): void {
        this.category = this.category === category ? '' : category;
        this.route();
    }

    onApplyFilters(priceMin: number, priceMax: number): void {
        this.priceMin = priceMin;
        this.priceMax = priceMax >= priceMin ? priceMax : -1;
        this.route();
    }

    onResetFilters(): void {
        this.category = '';
        this.priceMin = -1;
        this.priceMax = -1;
    }

    private route(): void {
        this.router.navigate(['/search'], {
            queryParams: {
                ...(this.query === '' ? {} : { query: this.query }),
                ...(this.category === '' ? {} : { category: this.category }),
                ...(this.priceMin < 0 ? {} : { price_min: this.priceMin }),
                ...(this.priceMax < 0 ? {} : { price_max: this.priceMax }),
            },
        });
    }
}
