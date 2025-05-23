import RPC from '~/service/order/rpc'
import { BASE_URL } from "~/service/config"
import type { IResponse } from "~/types/http"
import type {
    ICalcResidentParams,
    ICalcRes,
    ICreateRes
} from "~/service/order/types"

/**
 * Calculate Resident order price
 * @param params {ICalcResidentParams}
 * @returns {Promise<IResponse<ICalcRes>>}
 */
export const calcResident = (params: ICalcResidentParams): Promise<IResponse<ICalcRes>> => {
    return $fetch(BASE_URL + RPC.calcResident, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
}

/**
 * Create Resident order
 * @param token {string}
 * @param params {ICalcResidentParams}
 * @returns {Promise<IResponse<ICalcRes>>}
 */
export const createResident = (token: string, params: ICalcResidentParams): Promise<IResponse<ICreateRes>> => {
    return $fetch(BASE_URL + RPC.createResident, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'cf-turnstile-response': token
        },
        body: JSON.stringify(params)
    })
}
