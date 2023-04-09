import { auth as authService } from '@/core/auth';
import store from '@/store'

export const authenticated = (to: any, from: any, next: any) => {
    if (authService.isAuthenticated()) {
        next()
    } else {
        next({ name: 'login' })
    }
}

export const loadAuthenticatedUser = (to: any, from: any, next: any) => {
    if (to.name !== 'login') {
        authService.getAuthenticatedUser()
        .then(user => {
            store.commit('auth/SET_CURRENT_USER', user);
            store.commit('auth/SET_AUTHENTICATED', true);
        })
    }
    next();
}