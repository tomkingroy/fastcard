import en from "~/lang/en/index"
import ja from "~/lang/ja/index"
import ko from "~/lang/ko/index"
import fr from "~/lang/fr/index"
import it from "~/lang/it/index"
import hi from "~/lang/hi/index"

// import ru from "~/lang/ru/index"
// import pt from "~/lang/pt/index"
// import nl from "~/lang/nl/index"
// import th from "~/lang/th/index"
// import ms from "~/lang/ms/index"

let defaultLocale = 'en'

if (import.meta.client) {
    const browserLocale = localStorage.getItem('locale') || navigator?.language || navigator?.userLanguage
    defaultLocale = browserLocale.split('-')[0]
}

export default defineI18nConfig(() => ({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages: {ja, en, ko, fr,it,hi, /*ru, pt,  nl,  th, ms*/},
    strategy: 'prefix_except_default'
}))
