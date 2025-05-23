// import { useAsyncData } from '#app'
import RPC from '~/service/proxy/rpc'
import type { IResponse } from "~/types/http"
import type {
    IIpv4AndIpv6AndIspProxyListRes,
    IMobileProxyListRes,
    IResidentProxyListRes
} from "~/service/proxy/types"
// import httpRequest from "~/service/http"

const BASE_URL = 'https://baseurl.net'

/**
 * Get IPv4 proxy list
 * @returns {Promise<IResponse<IIpv4AndIpv6AndIspProxyListRes>>}
 */
export const getIpv4ProxyList = (): Promise<IResponse<IIpv4AndIpv6AndIspProxyListRes>> => {
    return useHttp.get<IIpv4AndIpv6AndIspProxyListRes>(RPC.ipv4ProxyList)
    // return httpRequest.get(RPC.ipv4ProxyList)
    /*return $fetch(BASE_URL + RPC.ipv4ProxyList, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })*/

    /*return useAsyncData('getIpv4ProxyList', () =>
        $fetch(BASE_URL + RPC.ipv4ProxyList, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    )*/
}

/**
 * Get IPv6 proxy list
 * @returns {Promise<IResponse<IIpv4AndIpv6AndIspProxyListRes>>}
 */
export const getIpv6ProxyList = (): Promise<IResponse<IIpv4AndIpv6AndIspProxyListRes>> => {
    return $fetch(BASE_URL + RPC.ipv6ProxyList, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/**
 * Get ISP proxy list
 * @returns {Promise<IResponse<IIpv4AndIpv6AndIspProxyListRes>>}
 */
export const getIspProxyList = (): Promise<IResponse<IIpv4AndIpv6AndIspProxyListRes>> => {
    return $fetch(BASE_URL + RPC.ispProxyList, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/**
 * Get Mobile proxy list
 * @returns {Promise<IResponse<IMobileProxyListRes>>}
 */
export const getMobileProxyList = (): Promise<IResponse<IMobileProxyListRes>> => {
    return $fetch(BASE_URL + RPC.mobileProxyList, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/**
 * Get Resident proxy list
 * @returns {Promise<IResponse<IResidentProxyListRes>>}
 */
export const getResidentProxyList = (): Promise<IResponse<IResidentProxyListRes>> => {
    return $fetch(BASE_URL + RPC.residentProxyList, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
