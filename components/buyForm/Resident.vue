<script setup lang="ts">
import to from "await-to-js"
import {
  NButton,
  NForm,
  NFormItem,
  NGrid,
  NGi,
  NSelect,
  NCascader,
  NInput,
  NTooltip,
  NSpin,
  NSkeleton
} from 'naive-ui'
import useProxy from "~/stores/proxy"
import { calcResident, createResident } from "~/service/order"
import { getResidentProxyList } from "~/service/proxy"
import { noSideSpace } from "~/utils/input"
import type { FormRules } from 'naive-ui'
import type { ICalcResidentParams } from "~/service/order/types"
import type { TIpType } from "~/types/ipType"
import type paymentStatus from "~/types/paymentStatus"

const proxyStore = useProxy()
const config = useRuntimeConfig()
const localePath = useLocalePath()

const formRef = ref()
const form = reactive<ICalcResidentParams>({
  tarifId: 0,
  periodId: '30d',
  targetSectionId: 0,
  targetId: 0,
  pin: ''
})
const rules: FormRules = {
  tarifId: [
    {
      required: true,
      message: 'Please select tariff plan'
    }
  ],
  targetSectionId: [
    {
      required: true,
      message: 'Please select Specify service'
    }
  ],
  periodId: [
    {
      required: true,
      message: 'Please select Rental period'
    }
  ],
  pin: [
    {
      required: true,
      message: 'Please enter PIN'
    }
  ]
}

const _target = ref()
const showTurnstile = ref(false)
const buyBtnLoading = ref(false)
const initLoading = ref(!proxyStore.resident.target.length)
const isGetAQuote = ref(true)
const buyText = ref('Get a Quote')
const price = ref('--')
const token = ref()

const periodList = computed(() => proxyStore.resident.period)
const targetOptions = computed(() => proxyStore.resident.target)

const turnstileError = (code: string | number) => {
  console.error('turnstileError', code)
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

const calcPrice = async () => {
  await nextTick()
  if (buyBtnLoading.value) return

  buyBtnLoading.value = true

  const [ err, res ] = await to(calcResident(toRaw(form)))

  buyBtnLoading.value = false

  if (err) return

  const _price = String(res.data.total)
  price.value = _price
  buyText.value = `Buy proxy for $${ _price }`
  isGetAQuote.value = false
}

const createOrder = async () => {
  showTurnstile.value = false

  const [ err, res ] = await to(createResident(token.value, toRaw(form)))
  buyBtnLoading.value = false
  if (err) return

  const data = res.data

  await addOrderRecordToLocal({
    orderId: data.orderId,
    proxyType: 'resident' as TIpType,
    status: data.status as paymentStatus,
    createTime: new Date().getTime(),
    period: form.periodId,
    totalPrice: data.amount,
    paymentAddress: data.paymentAddress
  })

  navigateTo(localePath('/order/record'))
  window.open(data.paymentAddress, "_blank")
}

const handleTargetChange = (value: any, __: any, list: any) => {
  form.targetSectionId = list[0].sectionId
  form.targetId = list[1].id
  _target.value = value
}

const refreshQuote = () => {
  isGetAQuote.value = true
  buyText.value = 'Get a Quote'
}

const handleSubmit = () => {
  isGetAQuote.value ? calcPrice() : submitForm()
}

const loadResidentProxyList = async () => {
  await nextTick()
  if (proxyStore.resident.target.length) return

  initLoading.value = true
  const [ err, res ] = await to(getResidentProxyList())
  initLoading.value = false

  if (err) return

  const {items} = res?.data || {}

  proxyStore.setResident({
    /* Pay-As-You-Go
     {
     "id": 3396138,
     "name": "Pay as go"
     }
     */
    tarifs: items.tarifs.filter(item => item.name !== 'Pay as go' && item.id !== 3396138),
    target: items.target
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

onMounted(async () => {
  // @ts-ignore
  if (import.meta.client) {
    await loadResidentProxyList()
    await nextTick()
    form.tarifId = proxyStore.resident.tarifs[0].id
    form.targetSectionId = targetOptions.value[0].sectionId
    form.targetId = targetOptions.value[0].targets[0].id
    _target.value = targetOptions.value[0].targets[0].id
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
          <span>15 Million+ IPs</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>210+ countries</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Ethically sourced</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Targeting: country / state / city / ISP</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>Rotation 0-3600 secs or sticky sessions</span>
        </li>
      </ul>

      <div class="label-wrap">
        <p class="label">Additional Information</p>
      </div>
      <ul class="desc-list">
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>No CAPTCHAs or other restrictions</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>1000 IPs per list, unlimited list creation</span>
        </li>
        <li>
          <Icon class="icon" mode="svg" name="mdi-light:check-circle"/>
          <span>User:Pass or IP whitelist</span>
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
              <n-form-item label="Select a tariff plan" path="tarifId">
                <n-skeleton :sharp="false" v-if="initLoading" class="h-34"/>
                <n-select
                    v-else
                    filterable
                    style="width: 100%"
                    @update:value="refreshQuote"
                    v-model:value="form.tarifId"
                    :options="proxyStore.resident.tarifs"
                    label-field="name"
                    value-field="id"
                    key="id"
                    placeholder="Select a tariff plan"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="24">
              <n-form-item label="Specify service" path="targetSectionId">
                <n-skeleton :sharp="false" v-if="initLoading" class="h-34"/>
                <n-cascader
                    v-else
                    style="width: 100%"
                    v-model:value="_target"
                    :options="targetOptions"
                    label-field="name"
                    value-field="id"
                    children-field="targets"
                    check-strategy="child"
                    placeholder="Please select Specify service"
                    :on-update:value="handleTargetChange"
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="24">
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
