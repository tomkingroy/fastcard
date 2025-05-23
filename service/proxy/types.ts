export interface IIdAndNameItems<T = number> {
    id: T
    name: string
}

export interface ITargetItems {
    id: number
    sectionId: number
    name: string
    targets: IIdAndNameItems[]
}

export interface ICountryItems {
    id: number
    name: string
    alpha3: string
    alpha2: string
    className?: string
    country?: string | undefined
}

/**
 * ipv4 | ipv6 | isp
 */
export interface IIpv4AndIpv6AndIspProxyItems {
    target: ITargetItems[]
    country: ICountryItems[]
    period: IIdAndNameItems<string>[]
}

export interface IIpv4AndIpv6AndIspProxyListRes {
    items: IIpv4AndIpv6AndIspProxyItems
}

/**
 * mobile
 */
export interface IOperatorsItems {
    id: string
    name: string
    traffic: string
    rotations: IIdAndNameItems[]
}

export interface IMobileCountryItems extends ICountryItems {
    operators: {
        dedicated: IOperatorsItems[]
    }
}

export interface IMobileProxyItems {
    country: IMobileCountryItems[]
    period: IIdAndNameItems<string>[]
}

export interface IMobileProxyListRes {
    items: IMobileProxyItems
}

/**
 * resident
 */
export interface IResidentProxyItems {
    target: ITargetItems[]
    tarifs: IIdAndNameItems[]
    period?: IIdAndNameItems<string>[]
}

export interface IResidentProxyListRes {
    items: IResidentProxyItems
}
