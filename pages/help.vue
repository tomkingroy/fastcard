<script setup lang="ts">
import { NCollapse, NCollapseItem } from 'naive-ui'
</script>

<template>
  <div class="help-page">
    <main class="auto-layout">
      <h1 class="fc-main-title">Help</h1>

      <n-collapse>
        <n-collapse-item title="How to view orders and products?">
          <div>
            Use the device you placed the order with and click the order navigation button at the top to view your
            order. If you have switched devices and cannot view your order, please avoid using incognito mode when
            placing an order, as the order information will be lost when you close the webpage..
          </div>

        </n-collapse-item>
        <n-collapse-item title="When will the products be shipped?">
          <div>
            Unless otherwise stated, all items will be shipped within 24 hours after payment.
          </div>
        </n-collapse-item>
        <n-collapse-item title="What if I forget my PIN?">
          <div>
            We cannot assist with this issue as your PIN is stored in encrypted form. If you forget your PIN and cannot
            retrieve the product, unfortunately, we are unable to help.
          </div>
        </n-collapse-item>
        <n-collapse-item title="What should I do if the IP is not usable?">
          <div>
            <p>1. It is recommended to first check if the IP has expired. Expired IPs may not function properly, which
              is normal. If you wish to continue using the service, please purchase a new IP</p>
            <p>2. If the IP has not expired, please use tools to troubleshoot its connectivity. If the IP is confirmed
              to be inaccessible, please contact <a href="mailto:help@Fastcard.com">help@Fastcard.com</a></p>
          </div>
        </n-collapse-item>
        <n-collapse-item title="Can I get a refund for the product?">
          <div>
            Refunds are not supported. Once your payment is successful, the product has been locked and dispatched,
            making it impossible to retrieve.
          </div>
        </n-collapse-item>
      </n-collapse>
    </main>
  </div>
</template>
<style lang="scss">
.help-page {
  padding-bottom: 40px;
}

</style>
