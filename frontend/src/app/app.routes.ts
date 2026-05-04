import { CartComponent } from '@components/cart/cart.component';
import { HomeComponent } from '@components/home/home.component';
import {Login} from '@components/authentication/login/login.component';
import { ProductDetailComponent } from '@components/products/detail/product-detail.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    },
    {
        path: 'product/:id',
        component: ProductDetailComponent,
    },
    {
        path: 'account',
        component: Login, // move to account component that redirects to /login if not logged in
    },
];
