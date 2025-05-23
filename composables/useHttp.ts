import type { NitroFetchRequest } from 'nitropack'
import type { SearchParameters } from 'ofetch'
import type { UseFetchOptions } from '#app'
import type { IResponse } from "~/types/http"

async function customFetch<T>(url: NitroFetchRequest, opts: UseFetchOptions<any>): Promise<IResponse<T>> {
    const {$i18n} = useNuxtApp()
    const locale = $i18n.locale.value

    return new Promise((resolve, reject) => {
        useFetch(url, {
            // The ofetch library will automatically identify the request address, and will not concatenate the baseURL for requests that already contain a domain name in the URL
            baseURL: 'https://baseurl.net',
            headers: {
                'Content-Type': 'application/json',
                'Content-Language': locale,
                ...opts.headers
            },
            onResponse({response}) {
                console.log('response ------->', response)
                const data = response._data as IResponse<T>
                if (data.code !== 200) {
                    reject(data)
                    console.warn(
                        '=== error url: ',
                        url,
                        '\n params:',
                        opts,
                        '\n response:',
                        data
                    )
                    // showToast(response._data.message);
                }
                else {
                    resolve(data)
                }
            },
            onRequestError({request, options, error}) {
                // Handling request errors
                // console.warn('request error', error);
                // showToast('Request Error');
            },
            onResponseError({request, response, options}) {
                // Handling Response Errors
                // console.warn('request error', response);
                // showToast('Request Error');
            }
        })
    })
}

const useHttp = {
    get: async <T>(url: NitroFetchRequest, params?: SearchParameters, option?: UseFetchOptions<any>): Promise<IResponse<T>> => {
        return customFetch<T>(url, {method: 'get', params, ...option})
    },

    post: <T>(url: NitroFetchRequest, body?: RequestInit['body'] | Record<string, any>, option?: UseFetchOptions<any>): Promise<IResponse<T>> => {
        return customFetch<T>(url, {method: 'post', body, ...option})
    },

    put: <T>(url: NitroFetchRequest, body?: RequestInit['body'] | Record<string, any>, option?: UseFetchOptions<any>): Promise<IResponse<T>> => {
        return customFetch<T>(url, {method: 'put', body, ...option})
    },

    delete: <T>(url: NitroFetchRequest, body?: RequestInit['body'] | Record<string, any>, option?: UseFetchOptions<any>): Promise<IResponse<T>> => {
        return customFetch<T>(url, {method: 'delete', body, ...option})
    }
}
export default useHttp
