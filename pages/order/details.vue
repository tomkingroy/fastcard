<script setup lang="ts">
import { updateOrderRecordInLocal } from "~/composables/localOrderRecord"

definePageMeta({
  type: 'successOrder',
  path: '/order/details'
})

import to from "await-to-js"
import { noSideSpace } from "~/utils/input"
import { queryOrderDetails } from "~/service/order"
import paymentStatus, { paymentStatusTranslations } from "~/types/paymentStatus"

import {
  useMessage,
  NButton,
  NSpace,
  NTag,
  NDescriptions,
  NDescriptionsItem,
  NEmpty,
  NSpin,
  NForm,
  NFormItem,
  NInput,
  NTime
} from 'naive-ui'
import useClipboard from "~/composables/clipboard"
import type { FormRules } from 'naive-ui'
import type { IQueryOrderDetailsParams, IQueryOrderDetailsRes } from "~/service/order/types"
import deliveryType from "~/types/deliveryType"

const defaultOrderData: IQueryOrderDetailsRes = {
  amount: "",
  paymentAmount: null,
  payerCurrency: null,
  txid: null,
  currency: "",
  status: null,
  payNetwork: null,
  payUrl: "",
  expiredAt: 0,
  type: "",
  isDelivered: 0,
  deliveredType: 0,
  productInfo: null,
  country: null,
  quantity: 0,
  period: ""
}

const route = useRoute()
const message = useMessage()
const {copyToClipboard} = useClipboard()

const loading = ref(false)
const formRef = ref()
const form = reactive<IQueryOrderDetailsParams>({
  orderId: route.query.orderId as string || '',
  pin: ""
})
const rules: FormRules = {
  orderId: [
    {
      required: true,
      message: 'Please enter orderId'
    }
  ],
  pin: [
    {
      required: true,
      message: 'Please enter PIN'
    }
  ]
}

const orderData = reactive(<IQueryOrderDetailsRes>{...defaultOrderData})

const search = async () => {
  formRef.value?.validate((errors: any) => {
    !errors && getDetails()
  })
}

const resetOrderData = () => {
  Object.assign(orderData, defaultOrderData)
}

const getDetails = async () => {
  resetOrderData()
  if (loading.value) return
  loading.value = true
  const [ err, res ] = await to(queryOrderDetails(form))
  loading.value = false

  if (err) return

  const data = res.data
  if(data){
    orderData.amount = data.amount || 'none'
    orderData.paymentAmount = data.paymentAmount || '0.00'
    orderData.payerCurrency = data.payerCurrency
    orderData.txid = data.txid || 'none'
    orderData.currency = data.currency || 'none'
    orderData.status = data.status
    orderData.payNetwork = data.payNetwork || 'none'
    orderData.payUrl = data.payUrl || 'none'
    orderData.expiredAt = data.expiredAt
    orderData.type = data.type || 'none'
    orderData.isDelivered = data.isDelivered
    orderData.deliveredType = data.deliveredType
    orderData.productInfo = data.productInfo || 'none'
    orderData.country = data.country
    orderData.quantity = data.quantity
    orderData.period = data.period || 'none'

    updateOrderRecordInLocal(form.orderId,{
      status: orderData.status as paymentStatus
    })
  }

}

const copy = () => {
  copyToClipboard('IP:\n' +
      '120.23.23.45\n' +
      '\n' +
      'Port:\n' +
      '2389\n' +
      '\n' +
      'Account:\n' +
      'nidnfp@icon.defn\n' +
      '\n' +
      'Password:\n' +
      'r49ni12dnf09wedefn')
}

const call = () => {
  message.error('Copy successful')
}
onMounted(() => {
  if (!route.query.orderId) {
    const localePath = useLocalePath()
    navigateTo(localePath('/'))
  }
})
</script>

<template>
  <div class="order-success-page">
    <main class="auto-layout">
      <n-form
          inline
          size="small"
          :disabled="loading"
          class="search-form"
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="auto"
          label-position="top"
          hide-required-asterisk
          :show-require-mark="false"
      >
        <n-form-item path="pin" :show-label="false">
          <n-input
              v-model:value="form.pin"
              :allow-input="noSideSpace"
              style="width: 200px;"
              placeholder="Please enter PIN"
          />
        </n-form-item>

        <n-form-item :show-label="false">
          <n-button type="primary" :loading="loading" @click="search">Search</n-button>
        </n-form-item>
      </n-form>

      <n-spin :show="loading">
        <n-empty description="No order information." size="large" v-if="!orderData.type">
          <template #icon>
            <Icon class="icon" mode="svg" name="material-symbols:shopping-bag-speed"/>
          </template>
        </n-empty>

        <template v-else>
          <n-descriptions
              title="Order Details"
              :column="1"
              size="small"
              label-placement="left"
          >
            <n-descriptions-item label="IP Type">
              <p>{{ orderData.type }}</p>
            </n-descriptions-item>
            <n-descriptions-item label="Order Quantity">
              <p>{{ orderData.quantity }}</p>
            </n-descriptions-item>
            <n-descriptions-item label="Subscription Period">
              <p>{{ orderData.period }}</p>
            </n-descriptions-item>
            <n-descriptions-item label="Delivery Type">
              <p>{{ orderData.deliveredType === deliveryType.automatic ? 'Automatic' : 'Manual' }}</p>
            </n-descriptions-item>
            <n-descriptions-item label="Order Status">
              <p>{{ paymentStatusTranslations[orderData.status] }}</p>
            </n-descriptions-item>
            <n-descriptions-item label="Payment Currency">
              <b v-if="orderData.payerCurrency" class="money-color">${{ orderData.payerCurrency }}</b>
              <p>none</p>
            </n-descriptions-item>
            <n-descriptions-item label="Total order price">
              <b class="money-color">${{ orderData.amount }}</b>
            </n-descriptions-item>
            <n-descriptions-item label="Amount Paid">
              <b class="money-color">${{ orderData.paymentAmount }}</b>
            </n-descriptions-item>
            <n-descriptions-item label="Payment Methods">
              <p>{{ orderData.payNetwork }}</p>
            </n-descriptions-item>
            <n-descriptions-item label="Payment Validity Period">
              <n-time :time="orderData.expiredAt * 1000" type="datetime" format='yyyy-MM-dd HH:mm:ss'/>
            </n-descriptions-item>
            <n-descriptions-item label="Payment Address">
              <a :href="orderData.payUrl" target="_blank">{{ orderData.payUrl }}</a>
            </n-descriptions-item>
            <n-descriptions-item label="Transaction Hash">
              <p>{{ orderData.txid }}</p>
            </n-descriptions-item>
          </n-descriptions>

          <br>
          <br>
          <br>

          <n-descriptions
              v-if="orderData.isDelivered && orderData.productInfo"
              title="Product Details"
              :column="1"
              size="small"
              label-placement="left"
          >
            <n-descriptions-item label="IP">
              <p>120.23.23.45</p>
            </n-descriptions-item>
            <n-descriptions-item label="Port">
              <p>2389</p>
            </n-descriptions-item>
            <n-descriptions-item label="Account" :span="2">
              <p>nidnfp@icon.defn</p>
            </n-descriptions-item>
            <n-descriptions-item label="Password">
              <p>r49ni12dnf09wedefn</p>
            </n-descriptions-item>
          </n-descriptions>
          <br>
          <n-space v-if="orderData.isDelivered && orderData.productInfo">
            <n-button size="small" type="primary" @click="copy">Copy</n-button>
            <n-button size="small" @click="call">Contact Customer Service</n-button>
          </n-space>
        </template>
      </n-spin>
    </main>
  </div>
</template>

<style scoped lang="scss">
.order-success-page {
  flex: 1;
  width: 100%;
  height: 100%;
  font-weight: bold;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;

  .search-form {
    display: flex;
    justify-content: center;
  }
}
</style>
