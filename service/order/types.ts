import { TIpType } from "~/types/ipType"
import paymentStatus from "~/types/paymentStatus"
import deliveryType from "~/types/deliveryType"
import isDelivered from "~/types/isDelivered"

export type country = {
    id: number
    name: string
    alpha2: string
}

/**
 * Estimate cost for IPv4 / Create IPv4 order
 */
export interface ICalcIpv4Params {
    country: country
    periodId: string
    quantity: number
    targetSectionId: number
    targetId: number
    pin: string
}

/**
 * Estimate cost for IPv6 / Create IPv6 order
 */
export interface ICalcIpv6Params {
    country: country
    periodId: string
    quantity: number  // Minimum 10
    protocol: "HTTPS" | "SOCKS5"
    customTargetName: string
    pin: string
}

/**
 * Estimate cost for ISP / Create ISP order
 */
export interface ICalcIspParams extends ICalcIpv4Params {}

/**
 * Estimate cost for Mobile / Create Mobile order
 */
export interface ICalcMobileParams {
    country: country
    periodId: string
    quantity: number
    operatorId: string
    rotationId: number
    pin: string
}

/**
 * Estimate cost for Resident / Create Resident order
 */
export interface ICalcResidentParams {
    tarifId: number
    periodId: string
    targetSectionId: number
    targetId: number
    pin: string
}

/**
 * Estimated cost result
 */
export interface ICalcRes {
    price: number
    warning: string
    balance: number
    total: number
    quantity: number
    currency: string
    discount: number
}

/**
 * Order details query parameters
 */
export interface IQueryOrderDetailsParams {
    orderId: string
    pin: string
}

/**
 * Order details response
 */
export interface IQueryOrderDetailsRes {
    amount: string; // Order amount as a currency-formatted string
    paymentAmount: string | null; // Actual paid amount, can be null
    payerCurrency: string | null; // Currency used for payment, can be null
    txid: string | null; // Transaction hash, can be null
    currency: string; // Order currency, e.g., "USD"
    status: paymentStatus | null; // Order status
    payNetwork: string | null; // Payment network, can be null
    payUrl: string; // URL to the payment page
    expiredAt: number; // Order expiration time (UNIX timestamp)
    type: string; // Product type
    isDelivered: isDelivered, // Delivery status: 0 = Not delivered, 1 = Delivered
    deliveredType: deliveryType, // Delivery type: 0 = Auto, 1 = Manual
    productInfo: string | null; // Product information, can be null
    country: country | null; // Country information
    quantity: number; // Quantity ordered
    period: string; // Duration, e.g., "7d" means 7 days
}

/**
 * Order creation result
 */
export interface ICreateRes {
    orderId: string; // Unique order identifier
    amount: string; // Payment amount as string for format compatibility
    status: string; // Order status, e.g., 'check'
    paymentAddress: string; // Payment address URL
}

/**
 * Order record
 */
export interface IOrderRecordItems {
    orderId: string
    country?: country
    proxyType: TIpType
    quantity?: number
    status: paymentStatus
    createTime: number
    period: string
    totalPrice: string
    paymentAddress: string
}
