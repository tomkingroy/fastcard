import RPC from '~/service/order/rpc'
import { BASE_URL } from "~/service/config"
import type { IResponse } from "~/types/http"
import type {
    ICalcIspParams,
    ICalcRes,
    ICreateRes
} from "~/service/order/types"

/**
 * Calculate ISP order price
 * @param params {ICalcIspParams}
 * @returns {Promise<IResponse<ICalcRes>>}
 */
export const calcIsp = (params: ICalcIspParams): Promise<IResponse<ICalcRes>> => {
    return $fetch(BASE_URL + RPC.calcIsp, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
}

/**
 * Create ISP order
 * @param token {string}
 * @param params {ICalcIspParams}
 * @returns {Promise<IResponse<ICalcRes>>}
 */
export const createIsp = (token: string, params: ICalcIspParams): Promise<IResponse<ICreateRes>> => {
    return $fetch(BASE_URL + RPC.createIsp, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cf-turnstile-response': token
        },
        body: JSON.stringify(params)
    })
}
