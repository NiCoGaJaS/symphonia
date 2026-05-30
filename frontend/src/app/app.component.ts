import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FooterComponent } from '@components/global/footer/footer.component';
import { NavbarComponent } from '@components/global/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        FooterComponent,
        NavbarComponent,
        ToastModule,
        ConfirmDialogModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService, ConfirmationService],
})
export class AppComponent {
    title = 'frontend';
}
