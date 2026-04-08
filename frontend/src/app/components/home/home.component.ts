import {Component} from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {DataviewLayoutDemo} from './products/products.component';

@Component({
  selector: 'app-home',
  imports: [ PaginatorModule, DataviewLayoutDemo],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
