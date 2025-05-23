<script setup lang="ts">
/*
const tt = useI18n()
const { $i18n } = useNuxtApp()
const locale = $i18n.locale.value
console.log('------------>',tt.t('header.home'), locale, tt.locale)
*/

</script>

<template>
  <header class="header">
    <nav class="auto-layout">
      <LocLink to="/" class="logo">
        <img src="~/assets/icons/logo.svg" alt="Logo">
        <b>PRO IP</b>
      </LocLink>

      <div class="nav-list desktop">
        <LocLink class="link" to="/">{{ $t('header.home') }}</LocLink>
        <LocLink class="link" to="/order/record">{{ $t('header.order') }}</LocLink>
        <LocLink class="link" to="/help">{{ $t('header.help') }}</LocLink>
<!--        <LocLink class="link" to="/contactUs">{{ $t('header.contactUs') }}</LocLink>-->
        <!--        <ColorMode/>-->
        <LangSwitcher class="lang-switcher"/>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: $theme-bg;
  border-bottom: 1px solid $border-color;

  nav {
    flex: 1;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 !important;

      img {

        width: 60px;
        height: 60px;
      }

      b {
        font-size: 20px;
        font-weight: bold;
      }
    }

    .nav-list {
      margin-left: auto;
      align-items: center;
      display: flex;
      gap: 10px;

      .link {
        width: auto !important;
        height: 60px !important;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        color: #E6E6E6;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        white-space: nowrap;
        padding: 0 28px !important;

        &:hover,
        &.router-link-active {
          color: #FFF;
          background-color: $hover-bg;
        }
      }

      .lang-switcher {
        margin-left: 20px;
      }
    }
  }
}

/* Hide navigation */
@media screen and (max-width: 980px) {
  .header nav .desktop {
    display: none;
  }
}

/* Middle screen style（768px ~ 1440px） */
@media screen and (max-width: 1440px) {
  .header {
    height: 85px;

    nav {
      height: 85px;

      .logo {
        img {
          width: 40px;
          height: 40px;
        }

        b {
          font-size: 18px;
        }
      }

      .nav-list .link {
        font-size: 14px;
        padding: 0 22px !important;
      }
    }
  }
}

/* Small screen style（Less than 768px） */
@media screen and (max-width: 768px) {
  .header {
    height: 60px;

    nav {
      height: 60px;
    }
  }
}
</style>
