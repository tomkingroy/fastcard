<script setup lang="ts">
import to from "await-to-js"
import {
  NButton,
  NForm,
  NFormItem,
  NGrid,
  NGi,
  NSelect,
  NInput,
  NInputNumber,
  NTooltip,
  NSpin,
  NSkeleton
} from 'naive-ui'
import useProxy from "~/stores/proxy"
import { getMobileProxyList } from "~/service/proxy"
import { calcMobile, createMobile } from "~/service/order"
import { noSideSpace } from "~/utils/input"
import { alpha3ToAlpha2 } from "~/composables/alpha3ToAlpha2"
import type { FormRules } from 'naive-ui'
import type { ICalcMobileParams } from "~/service/order/types"
import type { ICountryItems, IMobileCountryItems, IOperatorsItems } from "~/service/proxy/types"
import type { TIpType } from "~/types/ipType"
import type paymentStatus from "~/types/paymentStatus"

const proxyStore = useProxy()
const config = useRuntimeConfig()
const localePath = useLocalePath()

const formRef = ref()
const form = reactive<ICalcMobileParams>({
  country: {
    id: 0,
    name: '',
    alpha2: ''
  },
  periodId: "",
  quantity: 1,
  rotationId: 0,
  operatorId: '',
  pin: ''
})
const rules: FormRules = {
  'country.id': [
    {
      required: true,
      message: 'Please select country'
    }
  ],
  operatorId: [
    {
      required: true,
      message: 'Please select carrier',
      trigger: 'change'
    }
  ],
  customTargetName: [
    {
      required: true,
      message: 'Please enter the purpose of use.'
    }
  ],
  protocol: [
    {
      required: true,
      message: 'Please select proxy protocol'
    }
  ],
  periodId: [
    {
      required: true,
      message: 'Please select Rental period'
    }
  ],
  quantity: [
    {required: true, message: 'Please enter buy quantity'}
  ],
  pin: [
    {
      required: true,
      message: 'Please enter PIN'
    }
  ]
}

const showTurnstile = ref(false)
const buyBtnLoading = ref(false)
const initLoading = ref(!proxyStore.mobile.country.length)
const isGetAQuote = ref(true)
const buyText = ref('Get a Quote')
const price = ref('--')
const token = ref()

const periodList = computed(() => proxyStore.mobile.period)
const dedicatedList = ref<IOperatorsItems[]>([])
const rotationList = ref<any[]>([])

const turnstileError = (code: string | number) => {
  console.log('turnstileError', code)
}

const turnstileUnsupported = () => {
  console.log('turnstileUnsupported')
}

const turnstileExpired = () => {
  console.log('turnstileExpired')
}

const turnstileBeforeInteractive = () => {
  console.log('turnstileBeforeInteractive')
}

const turnstileAfterInteractive = () => {
  console.log('turnstileAfterInteractive')
}

const renderLabel = (row: any) => {
  return [
    h(
        'span',
        {class: row.className}
    ),
    h(
        'span',
        {
          style: {
            marginLeft: '10px',
            fontSize: ' 13px'
          }
        },
        row.country
    ) ]
}

const calcPrice = async () => {
  await nextTick()
  if (buyBtnLoading.value) return

  buyBtnLoading.value = true
  const [ err, res ] = await to(calcMobile(toRaw(form)))
  buyBtnLoading.value = false

  if (err) return

  const _price = String(res.data.total)
  price.value = _price
  buyText.value = `Buy proxy for $${ _price }`
  isGetAQuote.value = false
}

const createOrder = async () => {
  showTurnstile.value = false

  const [ err, res ] = await to(createMobile(token.value, toRaw(form)))
  buyBtnLoading.value = false
  if (err) return

  const data = res.data

  await addOrderRecordToLocal({
    orderId: data.orderId,
    country: form.country,
    proxyType: 'mobile' as TIpType,
    quantity: form.quantity,
    status: data.status as paymentStatus,
    createTime: new Date().getTime(),
    period: form.periodId,
    totalPrice: data.amount,
    paymentAddress: data.paymentAddress
  })

  navigateTo(localePath('/order/record'))
  window.open(data.paymentAddress, "_blank")
}

const handleCountryChange = (_: any, data: ICountryItems) => {
  form.country.name = data.name
  form.country.alpha2 = data.alpha2
  refreshQuote()
}

const refreshQuote = () => {
  isGetAQuote.value = true
  buyText.value = 'Get a Quote'
}

const handleSubmit = () => {
  isGetAQuote.value ? calcPrice() : submitForm()
}

const loadMobileProxyList = async () => {
  await nextTick()
  if (proxyStore.mobile.country.length) return

  initLoading.value = true
  const [ err, res ] = await to(getMobileProxyList())
  initLoading.value = false

  if (err) return

  const {items} = res?.data || {}
  const countryListFormatted = (Array.isArray(items.country) ? items.country : []).map(item => {
    const {code, country} = alpha3ToAlpha2(item.alpha3)
    return {
      ...item,
      country,
      alpha2: code,
      className: `fi fi-${ code }`
    }
  })

  proxyStore.setMobile({
    country: countryListFormatted,
    period: items.period
  })
}

const submitForm = async () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      buyBtnLoading.value = true
      showTurnstile.value = true
    }
    else {
      showTurnstile.value = false
    }
  })
}

watch(() => token.value, (value) => {
  if (value) createOrder()
})

watch(() => form.operatorId, (newValue: string) => {
  rotationList.value = dedicatedList.value.find(item => item.id === newValue)?.rotations || []
  form.rotationId = rotationList.value[0].id
})

watch(() => form.country.id, (newValue: number) => {
  const countryList = proxyStore.mobile.country
  const operators: IMobileCountryItems | undefined = (Array.isArray(countryList) ? countryList : []).find(item => {
    return item.id === newValue
  })

  const result = operators?.operators?.dedicated || []

  dedicatedList.value = result
  rotationList.value = result.length ? result[0].rotations : []

  form.operatorId = result[0].id
  form.rotationId = result[0].rotations[0].id
})

onMounted(async () => {
  // @ts-ignore
  if (import.meta.client) {
    await loadMobileProxyList()
    await nextTick()
    form.country.id = proxyStore.mobile.country[0].id
    form.country.name = proxyStore.mobile.country[0].name
    form.country.alpha2 = proxyStore.mobile.country[0].alpha2

    await nextTick()
    form.periodId = proxyStore.mobile.period[0].id
    form.operatorId = dedicatedList.value[0].id
    form.rotationId = dedicatedList.value[0].rotations[0].id
  }
})

</script>

<template>
  <ul class="buy-card">
    <li class="item characteristics">
      <div class="label-wrap">
        <p class="label">Characteristics</p>
      </div>
      <ul class="desc-list">
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Uptime 99%</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Speed is up to 50 Mbps</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Dynamic IPs</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Private proxies</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Customer support 24/7</span>
        </li>
      </ul>

      <div class="label-wrap">
        <p class="label">Additional Information</p>
      </div>

      <ul class="desc-list">
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Range of 500k+ IPs</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Automatic issuance</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Rotation by time or link</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Authorization by username/password or IP</span>
        </li>
      </ul>
    </li>
    <li class="item">
      <n-spin :show="initLoading">
        <n-form
            :disabled="buyBtnLoading"
            class="buy-form"
            ref="formRef"
            :model="form"
            :rules="rules"
            label-width="auto"
            label-position="top"
            hide-required-asterisk
            :show-require-mark="false"
        >
          <n-grid :x-gap="12" :y-gap="2">
            <n-gi :span="24">
              <n-form-item label="Select country" path="country.id">
                <n-skeleton :sharp="false" v-if="initLoading" class="h-34"/>
                <n-select
                    v-else
                    filterable
                    style="width: 100%"
                    @update:value="handleCountryChange"
                    v-model:value="form.country.id"
                    :render-label="renderLabel"
                    :options="proxyStore.mobile.country"
                    label-field="country"
                    value-field="id"
                    key="id"
                    placeholder="Select Country"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="12">
              <n-form-item label="Select carrier" path="operatorId">
                <n-skeleton :sharp="false" v-if="initLoading" class="h-34"/>
                <n-select
                    v-else
                    filterable
                    style="width: 100%"
                    @update:value="refreshQuote"
                    v-model:value="form.operatorId"
                    :options="dedicatedList"
                    label-field="name"
                    value-field="id"
                    key="id"
                    placeholder="Select carrier"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="12">
              <n-form-item label="Rotation" path="periodId">
                <n-skeleton :sharp="false" v-if="initLoading" class="h-34"/>
                <n-select
                    v-else
                    filterable
                    style="width: 100%"
                    @update:value="refreshQuote"
                    v-model:value="form.rotationId"
                    :options="rotationList"
                    label-field="name"
                    value-field="id"
                    key="id"
                    placeholder="Please select Rental period"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="12">
              <n-form-item label="Quantity" path="quantity">
                <n-skeleton :sharp="false" v-if="initLoading" class="h-34"/>
                <n-input-number
                    v-else
                    style="width: 100%"
                    @update:value="refreshQuote"
                    v-model:value="form.quantity"
                    :step="1"
                    :min="1"
                    :precision="0"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="12">
              <n-form-item label="Rental period" path="periodId">
                <n-skeleton :sharp="false" v-if="initLoading" class="h-34"/>
                <n-select
                    v-else
                    filterable
                    style="width: 100%"
                    @update:value="refreshQuote"
                    v-model:value="form.periodId"
                    :options="periodList"
                    label-field="name"
                    value-field="id"
                    key="id"
                    placeholder="Please select Rental period"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="24">
              <n-form-item path="pin">
                <template #label>
                  <div class="pin-label">
                    <p>Personal Identification Number</p>
                    <n-tooltip placement="top" trigger="hover">
                      <p>
                        Please remember your PIN. After you create an order, the order ID will be saved on your current
                        device.
                        <br>
                        You can view your order records in the order list later. Using the PIN and the order ID, you can
                        check your order progress and product information.
                      </p>
                      <template #trigger>
                        <i>
                          <Icon class="icon" mode="svg" name="material-symbols-light:shield-question"/>
                        </i>
                      </template>
                    </n-tooltip>
                  </div>
                </template>

                <n-skeleton :sharp="false" v-if="initLoading" class="h-34"/>
                <n-input
                    v-else
                    type="password"
                    v-model:value="form.pin"
                    :allow-input="noSideSpace"
                    show-password-on="mousedown"
                    placeholder="You can query this order using the PIN"
                />
              </n-form-item>
            </n-gi>

            <!--            <n-gi :span="24">
                          <n-form-item path="telegram">
                            <template #label>
                              <div class="pin-label">
                                <span class="form-item-label"> 📩 Telegram Username (Optional)</span>
                                <n-tooltip placement="top" trigger="hover">
                                  <p>
                                    Stay Updated with Telegram Notifications! 📩
                                    <br>
                                    Enter your Telegram username to receive updates and notifications about your order status.
                                    <br>
                                    Example: @yourusername
                                    <br>
                                    • Providing your Telegram username is optional. If left blank, you will not receive
                                    notifications via Telegram.
                                    <br>
                                    • Make sure your username starts with @ and is spelled correctly to avoid delivery issues.
                                  </p>
                                  <template #trigger>
                                    <i>
                                      <Icon class="icon" mode="svg" name="material-symbols-light:shield-question"/>
                                    </i>
                                  </template>
                                </n-tooltip>
                              </div>
                            </template>

                            <n-input
                                v-model:value="form.pin"
                                :allow-input="noSideSpace"
                                placeholder="Enter your Telegram username"
                            />
                          </n-form-item>
                        </n-gi>-->
            <n-gi :span="24" v-if="showTurnstile">
              <Turnstile
                  :site-key="config.public.TURNSTILE_SITE_KEY"
                  v-model="token"
                  @error="turnstileError"
                  @unsupported="turnstileUnsupported"
                  @expired="turnstileExpired"
                  @before-interactive="turnstileBeforeInteractive"
                  @after-interactive="turnstileAfterInteractive"
                  style="margin-bottom: 15px;"
              />
            </n-gi>
            <n-gi :span="24">
              <n-form-item :show-label="false">
                <n-skeleton :sharp="false" v-if="initLoading" class="h-34"/>
                <n-button
                    v-else
                    type="primary"
                    style="width: 100%;"
                    :loading="buyBtnLoading"
                    @click="handleSubmit"
                >{{ buyText }}
                </n-button>
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-form>
      </n-spin>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.buy-card {
  margin-top: 20px;
  display: flex;
  gap: 20px;

  .label-wrap {
    display: flex;
    line-height: 30px;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;

    .label,
    .buying-guide {
      font-size: 20px;
      color: #ffffff;
    }

    .buying-guide:hover {
      color: #9EFF00;
    }
  }

  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .desc-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;

    li {
      display: flex;
      align-items: center;
      gap: 5px;
      line-height: 1.8;

      .icon {
        font-size: 16px;
        color: #00dc82;
      }

      span {
        font-size: 15px;
        color: #656567;
      }
    }
  }

  .pin-label {
    display: flex;
    gap: 4px;
    align-items: center;

    .icon {
      font-size: 24px;
      color: #00dc82;
    }
  }

  .h-34 {
    height: 34px;
  }

  /* Middle screen style（768px ~ 1440px） */
  @media screen and (max-width: 1440px) {
  }

  /* Hide navigation */
  @media screen and (max-width: 980px) {
    .characteristics {
      display: none;
    }
  }

  /* Small screen style（Less than 768px） */
  @media screen and (max-width: 768px) {
  }
}
</style>
