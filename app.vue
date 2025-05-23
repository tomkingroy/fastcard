<script lang="ts" setup>
import { NConfigProvider, NMessageProvider, darkTheme, NBackTop } from 'naive-ui'
import customTheme from '~/assets/css/naive-theme'

</script>

<template>
  <NConfigProvider :theme-overrides="customTheme" :theme="darkTheme">
    <n-message-provider>
      <div class="layout">
        <Header/>

        <main class="main">
          <NuxtPage/>
          <n-back-top/>
        </main>

        <Footer/>
      </div>
    </n-message-provider>
  </NConfigProvider>
</template>

<style scoped lang="scss">
.layout {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $theme-bg;
  align-items: center;

  .main {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
