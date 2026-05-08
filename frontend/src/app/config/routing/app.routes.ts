import { CanActivateFn, RedirectCommand, Router, Routes } from '@angular/router';
import { CartComponent } from '@components/cart/cart.component';
import { HomeComponent } from '@components/home/home.component';
import { Login } from '@components/authentication/login/login.component';
import { ProductDetailComponent } from '@components/products/detail/product-detail.component';
import { Profile } from '@components/authentication/profile/profile.component';
import { User } from '@api/authentication/user.store';
import { inject } from '@angular/core';

const isLoggedIn: CanActivateFn = () => {
    const user = inject(User);
    const router = inject(Router);

    if (user.isLoggedIn()) {
        return true;
    }

    return new RedirectCommand(router.parseUrl('/login'));
};

const isLoggedOut: CanActivateFn = () => {
    const user = inject(User);
    const router = inject(Router);

    if (!user.isLoggedIn()) {
        return true;
    }

    return new RedirectCommand(router.parseUrl('/'))
}

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
        path: 'login',
        component: Login,
        canActivate: [isLoggedOut]
    },
    {
        path: 'profile',
        component: Profile,
        canActivate: [isLoggedIn],
    },
];
