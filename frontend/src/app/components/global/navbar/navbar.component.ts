import {Component} from '@angular/core';
import {MenuComponent} from "../menu/menu.component";
import {RouterLink} from "@angular/router";
import {FormsModule} from '@angular/forms';
import {ToggleSwitchModule} from 'primeng/toggleswitch';

@Component({
  selector: 'app-navbar',
  imports: [
    MenuComponent,
    RouterLink,
    ToggleSwitchModule,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  darkMode: boolean = false;

  toggleTheme() {
    const html = document.documentElement;

    if (this.darkMode) {
      html.classList.add('app-dark');
    } else {
      html.classList.remove('app-dark');
    }
  }

}
