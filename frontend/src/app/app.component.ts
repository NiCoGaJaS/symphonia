import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@components/global/footer/footer.component';
import { NavbarComponent } from '@components/global/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'frontend';
}
