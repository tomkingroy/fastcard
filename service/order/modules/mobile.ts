import RPC from '~/service/order/rpc'
import { BASE_URL } from "~/service/config"
import type { IResponse } from "~/types/http"
import type {
    ICalcMobileParams,
    ICalcRes,
    ICreateRes
} from "~/service/order/types"

/**
 * Calculate Mobile order price
 * @param params {ICalcMobileParams}
 * @returns {Promise<IResponse<ICalcRes>>}
 */
export const calcMobile = (params: ICalcMobileParams): Promise<IResponse<ICalcRes>> => {
    return $fetch(BASE_URL + RPC.calcMobile, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
}

/**
 * Create Mobile order
 * @param token {string}
 * @param params {ICalcMobileParams}
 * @returns {Promise<IResponse<ICalcRes>>}
 */
export const createMobile = (token: string, params: ICalcMobileParams): Promise<IResponse<ICreateRes>> => {
    return $fetch(BASE_URL + RPC.createMobile, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cf-turnstile-response': token
        },
        body: JSON.stringify(params)
    })
}
