import { defineStore } from 'pinia'
import type {
    IIpv4AndIpv6AndIspProxyItems,
    IMobileProxyItems,
    IResidentProxyItems
} from "~/service/proxy/types"

export default defineStore('proxy', () => {
        const ipv4 = reactive<IIpv4AndIpv6AndIspProxyItems>({
            target: [],
            country: [],
            period: []
        })

        const ipv6 = reactive<IIpv4AndIpv6AndIspProxyItems>({
            target: [],
            country: [],
            period: []
        })

        const isp = reactive<IIpv4AndIpv6AndIspProxyItems>({
            target: [],
            country: [],
            period: []
        })

        const mobile = reactive<IMobileProxyItems>({
            country: [],
            period: []
        })

        const resident = reactive<IResidentProxyItems>({
            tarifs: [],
            target: [],
            period: [
                {
                    "id": "30d",
                    "name": "30 days"
                }
            ]
        })

        const setIpv4 = (data: IIpv4AndIpv6AndIspProxyItems) => {
            ipv4.target = data.target
            ipv4.country = data.country
            ipv4.period = data.period
        }

        const setIpv6 = (data: IIpv4AndIpv6AndIspProxyItems) => {
            ipv6.target = data.target
            ipv6.country = data.country
            ipv6.period = data.period
        }

        const setIsp = (data: IIpv4AndIpv6AndIspProxyItems) => {
            isp.target = data.target
            isp.country = data.country
            isp.period = data.period
        }

        const setMobile = (data: IMobileProxyItems) => {
            mobile.country = data.country
            mobile.period = data.period
        }

        const setResident = (data: IResidentProxyItems) => {
            resident.tarifs = data.tarifs
            resident.target = data.target
        }

        return {
            ipv4,
            ipv6,
            isp,
            mobile,
            resident,

            setIpv4,
            setIpv6,
            setIsp,
            setMobile,
            setResident
        }
    },
    {
        /*persist: process.client && {
            storage: sessionStorage,
            key: 'proxyList',

        }*/
    }
)
