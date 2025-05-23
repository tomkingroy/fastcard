<script setup lang="ts">
import { NSelect } from 'naive-ui'

const {locale, locales, setLocale} = useI18n()
const supportedLocales = locales.value as Array<any>

const router = useRouter()
const switchLocalePath = useSwitchLocalePath()

function onLocaleChanged(value: string) {
  const newLocale = value
  locale.value = newLocale
  router.push({path: switchLocalePath(newLocale)})
  localStorage.setItem('locale', newLocale)
}

// if (import.meta.client) {
//   const browserLocale =  localStorage.getItem('locale') || navigator?.language || navigator?.userLanguage
//   setLocale(browserLocale.split('-')[0])
// }
</script>

<template>
  <n-select
      style="width: 130px;"
      key="code"
      label-field="name"
      value-field="code"
      v-model:value="locale"
      :options="supportedLocales"
      @update:value="onLocaleChanged"
  />
</template>
