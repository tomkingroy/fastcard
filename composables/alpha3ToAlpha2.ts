import countryCodeLookup from 'country-code-lookup'

export const alpha3ToAlpha2 = (_alpha3: string): {
    country: string | undefined,
    code: string
} => {
    let alpha3 = _alpha3

    const convertCode: {
        [key: string]: string
    } = {
        "HKN": "HKG"
    }

    // transform
    if (convertCode[alpha3]) {
        alpha3 = convertCode[alpha3]
    }

    const data: any = countryCodeLookup.byIso(alpha3)

    return {
        country: data?.country,
        code: data?.iso2?.toLowerCase()
    }
}
