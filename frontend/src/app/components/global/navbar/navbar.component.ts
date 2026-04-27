import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
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
    showSearch = false;
    searchText = '';

    static readonly searchQuery = signal<string>('');

    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

    toggleSearch(): void {
        this.showSearch = !this.showSearch;

        if (this.showSearch) {
            setTimeout(() => {
                this.searchInput?.nativeElement.focus();
            });
        } else {
            this.searchText = '';
            NavbarComponent.searchQuery.set('');
        }
    }

    onSearchChange(): void {
        NavbarComponent.searchQuery.set(this.searchText);
    }
}
