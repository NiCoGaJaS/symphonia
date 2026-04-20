import { Component } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'app-footer',
    imports: [ToggleSwitchModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {}
