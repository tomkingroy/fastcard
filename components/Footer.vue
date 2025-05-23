<script setup lang="ts">
import {
  NGrid,
  NGi
} from 'naive-ui'
</script>

<template>
  <footer class="footer">
    <nav class="auto-layout">
      <n-grid :x-gap="12" class="row">
        <n-gi :span="6">
          <LocLink to="/">
            <img class="logo" src="~/assets/icons/logo.svg" alt="Logo">
          </LocLink>
        </n-gi>
        <n-gi :span="18">
          <LocLink to="/privacyPolicy">Privacy Policy</LocLink>
          <!--        <LocLink to="/cookiePolicy">Cookie Policy</LocLink>-->
        </n-gi>
      </n-grid>
    </nav>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid $border-color;

  .row {
    width: 100%;
    max-width: 1596px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .logo {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
