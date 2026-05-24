import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@components/global/footer/footer.component';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from '@components/global/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent, NavbarComponent, Toast],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService],
})
export class AppComponent {
    title = 'frontend';
}
