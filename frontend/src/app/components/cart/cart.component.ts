import { ConfirmationService, MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from '@components/cart/summary/summary.component';
import { TableComponent } from '@components/cart/table/table.component';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [
        FormsModule,
        ConfirmDialogModule,
        TableComponent,
        SummaryComponent,
    ],
    providers: [ConfirmationService, MessageService],
})
export class CartComponent {}
