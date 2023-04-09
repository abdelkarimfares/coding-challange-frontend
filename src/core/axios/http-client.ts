import axios from 'axios'
import type { HttpRequest, HttpResponse } from './types'
import { localStorageService } from '../storage'


const request = async (data: HttpRequest): Promise<HttpResponse> => {
    let axiosResponse: any
    const api = data.url
    let defaultHeaders: any = { 'Content-Type': 'application/json' };
    const authorizationToken = localStorageService.read('user/token');
    if (authorizationToken) {
        defaultHeaders = { ...defaultHeaders, Authorization: `${authorizationToken.token_type} ${authorizationToken.access_token}` }
    }

    try {
        axiosResponse = await axios.request({
            url: api,
            method: data.method,
            data: data.body,
            headers: { ...defaultHeaders, ...(data.headers || {}) }
        })
    } catch (error: any) {
        axiosResponse = error.response
    }
    return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data
    }
}

export const AxiosHttpClient = {
    request
}