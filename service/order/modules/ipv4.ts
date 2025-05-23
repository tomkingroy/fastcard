import RPC from '~/service/order/rpc'
import { BASE_URL } from "~/service/config"
import type { IResponse } from "~/types/http"
import type {
    ICalcIpv4Params,
    ICalcRes,
    ICreateRes
} from "~/service/order/types"

/**
 * Calculate IPv4 order price
 * @param params {ICalcIpv4Params}
 * @returns {Promise<IResponse<ICalcRes>>}
 */
export const calcIpv4 = (params: ICalcIpv4Params): Promise<IResponse<ICalcRes>> => {
    return $fetch(BASE_URL + RPC.calcIpv4, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
}

/**
 * Create IPv4 order
 * @param token {string}
 * @param params {ICalcIpv4Params}
 * @returns {Promise<IResponse<ICreateRes>>}
 */
export const createIpv4 = (token: string, params: ICalcIpv4Params): Promise<IResponse<ICreateRes>> => {
    return $fetch(BASE_URL + RPC.createIpv4, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cf-turnstile-response': token
        },
        body: JSON.stringify(params)
    })
}
