import { Component } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from '@components/order/summary/summary.component';
import { TableComponent } from '@components/order/table/table.component';

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
})
export class CartComponent {}
