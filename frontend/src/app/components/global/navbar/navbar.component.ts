import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
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
export class NavbarComponent {}
