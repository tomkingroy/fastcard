import RPC from '~/service/order/rpc'
import { BASE_URL } from "~/service/config"
import type { IResponse } from "~/types/http"
import type {
    IQueryOrderDetailsParams,
    IQueryOrderDetailsRes
} from "~/service/order/types"

/**
 * order details
 * @param params {IQueryOrderDetailsParams}
 * @returns {Promise<IResponse<IQueryOrderDetailsRes>>}
 */
export const queryOrderDetails = (params: IQueryOrderDetailsParams): Promise<IResponse<IQueryOrderDetailsRes>> => {
    return $fetch(BASE_URL + RPC.queryOrderDetails, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        params
    })
}
