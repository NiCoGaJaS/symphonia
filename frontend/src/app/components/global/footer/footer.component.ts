import { Component } from '@angular/core';
import { Divider } from 'primeng/divider';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'app-footer',
    imports: [ToggleSwitchModule, Divider],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {}
