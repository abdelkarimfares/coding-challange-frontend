import { AxiosHttpClient } from '@/core/axios';
import { HttpStatusCode } from '@/core/axios/types';
import { baseUrl } from '../env';

const loadPagedGroups = (payload: { page: number, perPage?: number }): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/groups?page=${payload?.page || 1}&per_page=${payload.perPage}`,
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

const loadGroup = (id: Number): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/groups/${id}/show`,
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

const createGroup = (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/groups/create`,
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

const editGroup = (id: Number, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/groups/${id}/update`,
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

const deleteGroup = (id: Number): Promise<any> => {
    return new Promise((resolve, reject) => {

        AxiosHttpClient.request({
            url: `${baseUrl}/groups/${id}/delete`,
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

export const groupService = {
    loadPagedGroups,
    deleteGroup,
    loadGroup,
    createGroup,
    editGroup
}