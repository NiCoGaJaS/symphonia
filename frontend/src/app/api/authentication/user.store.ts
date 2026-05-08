import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Role } from './role.model';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'user';

interface UserSession {
    id: string;
    role: Role;
}

@Injectable({ providedIn: 'root' })
export class User {

    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    private readonly session = signal<UserSession | null>(null)

    readonly id = computed(() => this.session()?.id ?? null);
    readonly role = computed(() => this.session()?.role ?? null);
    readonly isLoggedIn = computed(() => this.session() !== null);

    constructor() {
        if (this.isBrowser) {
            this.session.set(User.loadSessionFromStorage());
        }
    }

    set(id: string, role: Role): void {
        this.session.set({
            id: id,
            role: role
        } as UserSession)

        if (this.isBrowser) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.session()));
        }
    }

    clear(): void {
        this.session.set(null);

        if (this.isBrowser) {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    private static loadSessionFromStorage(): UserSession | null {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return null;
        }

        return JSON.parse(raw) as UserSession;
    }

}