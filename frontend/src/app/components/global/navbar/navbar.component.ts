import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    private readonly router = inject(Router);

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
