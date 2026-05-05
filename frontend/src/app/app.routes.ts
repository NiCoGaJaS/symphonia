import { CartComponent } from '@components/cart/cart.component';
import { HomeComponent } from '@components/home/home.component';
import { ProductDetailComponent } from '@components/products/detail/product-detail.component';
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
        component: ProductDetailComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
];
