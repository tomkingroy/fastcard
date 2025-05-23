import RPC from "~/service/order/rpc"
import { BASE_URL } from "~/service/config"
import type { IResponse } from "~/types/http"
import type {
    ICalcIpv6Params,
    ICalcRes,
    ICreateRes
} from "~/service/order/types"

/**
 * Calculate Ipv6 order price
 * @param params {ICalcIpv6Params}
 * @returns {Promise<IResponse<ICalcRes>>}
 */
export const calcIpv6 = (params: ICalcIpv6Params): Promise<IResponse<ICalcRes>> => {
    return $fetch(BASE_URL + RPC.calcIpv6, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
}

/**
 * Create IPv6 order
 * @param token {string}
 * @param params {ICalcIpv6Params}
 * @returns {Promise<IResponse<ICalcRes>>}
 */
export const createIpv6 = (token: string, params: ICalcIpv6Params): Promise<IResponse<ICreateRes>> => {
    return $fetch(BASE_URL + RPC.createIpv6, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cf-turnstile-response': token
        },
        body: JSON.stringify(params)
    })
}
