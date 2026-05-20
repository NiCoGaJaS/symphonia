import {
    CanActivateFn,
    RedirectCommand,
    Router,
    Routes,
} from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';
import { CartComponent } from '@components/cart/cart.component';
import { CheckoutComponent } from '@components/order/checkout/checkout.component';
import { HomeComponent } from '@components/home/home.component';
import { Login } from '@components/authentication/login/login.component';
import { ProductCatalog } from '@components/products/catalog/product-catalog.component';
import { ProductDetailComponent } from '@components/products/detail/product-detail.component';
import { ProductManagement } from '@components/admin/product/management/product-management.component';
import { Profile } from '@components/authentication/profile/profile.component';
import { User } from '@api/authentication/user.store';
import { isPlatformServer } from '@angular/common';

const isLoggedIn: CanActivateFn = () => {
    if (isPlatformServer(inject(PLATFORM_ID))) {
        return true;
    }

    const user = inject(User);
    const router = inject(Router);

    if (user.isLoggedIn()) {
        return true;
    }

    return new RedirectCommand(router.parseUrl('/login'));
};

const isLoggedOut: CanActivateFn = () => {
    if (isPlatformServer(inject(PLATFORM_ID))) {
        return true;
    }

    const user = inject(User);
    const router = inject(Router);

    if (!user.isLoggedIn()) {
        return true;
    }

    return new RedirectCommand(router.parseUrl('/'));
};

const isAdmin: CanActivateFn = () => {
    if (isPlatformServer(inject(PLATFORM_ID))) {
        return true;
    }

    const user = inject(User);
    const router = inject(Router);

    if (user.isAdmin()) {
        return true;
    }

    return new RedirectCommand(router.parseUrl('/'));
};

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
        path: 'checkout',
        component: CheckoutComponent,
    },
    {
        path: 'product/:id',
        component: ProductDetailComponent,
    },
    {
        path: 'login',
        component: Login,
        canActivate: [isLoggedOut],
    },
    {
        path: 'profile',
        component: Profile,
        canActivate: [isLoggedIn],
    },
    {
        path: 'search',
        component: ProductCatalog,
        data: { title: 'Produkte' },
    },
    {
        path: 'admin',
        children: [
            {
                path: 'products',
                component: ProductManagement,
            },
        ],
        canActivateChild: [isAdmin],
    },
];
