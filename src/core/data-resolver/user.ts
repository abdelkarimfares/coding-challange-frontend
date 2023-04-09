import { AxiosHttpClient } from '@/core/axios';
import { HttpStatusCode } from '@/core/axios/types';
import { baseUrl } from '../env';

const loadUsers = (payload: { page: Number }): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/users?page=${payload?.page || 1}`,
            method: 'get',
        })
            .then(response => {
                if (response.statusCode === HttpStatusCode.ok) {
                    resolve(response.body);
                } else {
                    reject(response)
                }
            })
            .catch(error => reject(error))
    })
}

const loadUser = (id: Number): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/users/${id}/show`,
            method: 'get',
        })
            .then(response => {
                if (response.statusCode === HttpStatusCode.ok) {
                    resolve(response.body.data);
                } else {
                    reject(response)
                }
            })
            .catch(error => reject(error))
    })
}

const createUser = (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/users/create`,
            method: 'post',
            body: data
        })
            .then(response => {
                if (response.statusCode === HttpStatusCode.created) {
                    resolve(response.body.data);
                } else {
                    reject(response)
                }
            })
            .catch(error => reject(error))
    })
}

const editUser = (id: Number, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/users/${id}/update`,
            method: 'patch',
            body: data,
        })
            .then(response => {
                if (response.statusCode === HttpStatusCode.ok) {
                    resolve(response.body.data);
                } else {
                    reject(response)
                }
            })
            .catch(error => reject(error))
    })
}

const deleteUser = (id: Number): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/users/${id}/delete`,
            method: 'delete',
        })
            .then(response => {
                if (response.statusCode === HttpStatusCode.ok) {
                    resolve(response.body);
                } else {
                    reject(response)
                }
            })
            .catch(error => reject(error))
    })
}

export const userService = {
    loadUsers,
    loadUser,
    createUser,
    editUser,
    deleteUser
}