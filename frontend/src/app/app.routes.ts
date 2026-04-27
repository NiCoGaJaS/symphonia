import { CartComponent } from '@components/cart/cart.component';
import { DetailComponent } from '@components/products/detail/detail.component';
import { HomeComponent } from '@components/home/home.component';
import { ProfileComponent } from '@components/profile/profile.component';
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
        component: DetailComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
];
