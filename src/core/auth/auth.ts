import { AxiosHttpClient } from '@/core/axios';
import { HttpStatusCode } from '@/core/axios/types';
import { localStorageService, sessionStorageService } from '@/core/storage';
import { baseUrl } from '../env';

const signin = (payload: { email: String, password: String }): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/auth/login`,
            method: 'post',
            body: payload
        })
            .then(response => {
                if (response.statusCode === HttpStatusCode.ok) {
                    localStorageService.store('user/token', response.body)
                    resolve(response.body);
                } else {
                    reject(response)
                }
            })
            .catch(error => reject(error))
    })
}

const getAccessToken = () => {
    return localStorageService.read('user/token')
}

const isAuthenticated = () => {
    const token = getAccessToken();
    // TODO: validate expires_at
    return token?.access_token;
}

const getAuthenticatedUser = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const storedData = sessionStorageService.read('user/info')
        if (storedData) {
            return resolve(storedData);
        }

        AxiosHttpClient.request({
            url: `${baseUrl}/auth/user`,
            method: 'get',
        })
            .then(response => {
                if (response.statusCode === HttpStatusCode.ok) {
                    sessionStorageService.store('user/info', response.body)
                    resolve(response.body);
                } else {
                    reject(response)
                }
            })
            .catch(error => reject(error))
    })
}

export const auth = {
    signin,
    getAuthenticatedUser,
    getAccessToken,
    isAuthenticated
}