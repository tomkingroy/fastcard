<script setup lang="ts">
definePageMeta({
  type: 'orderRecord',
  path: '/order/record',
  middleware: []
})

import { NDataTable, NSpace, NButton, NEmpty, NTime } from 'naive-ui'
import { paymentStatusTranslations } from "~/types/paymentStatus"
import { TIpType } from "~/types/ipType"
import type { IOrderRecordItems } from "~/service/order/types"

const localePath = useLocalePath()
const loading = ref(true)
const localOrderRecord = ref<IOrderRecordItems[]>([])
const columns = ref<Array<any>>([
  {
    title: () => 'Order ID',
    key: "orderId",
    minWidth: 300
  },
  {
    title: () => 'Country',
    key: "country",
    minWidth: 140,
    render: (row: IOrderRecordItems) => {
      if (row.proxyType === TIpType.resident) {
        return 'none'
      }

      return [
        h(
            'span',
            // @ts-ignore
            {class: `fi fi-${ row.country.alpha2 }`}
        ),
        h(
            'span',
            {
              style: {
                marginLeft: '10px',
                fontSize: ' 13px'
              }
            },
            // @ts-ignore
            row.country.name
        )
      ]
    }
  },
  {
    title: () => 'Proxy Type',
    key: "proxyType",
    minWidth: 100
  },
  {
    title: () => 'Quantity',
    key: 'quantity',
    minWidth: 100
  },
  {
    title: () => 'Status',
    key: "Order Status",
    minWidth: 200,
    render: (row: IOrderRecordItems) => paymentStatusTranslations[row.status]
  },
  {
    title: () => 'Order Creation Time',
    key: "createTime",
    minWidth: 180,
    render: (row: IOrderRecordItems) => {
      return h(
          NTime,
          {
            time: row.createTime,
            type: 'datetime',
            format: 'yyyy-MM-dd HH:mm:ss'
          }
      )
    }
  },
  {
    title: () => 'Subscription Period',
    key: "period",
    minWidth: 170
  },
  {
    title: () => 'Total Price',
    key: "totalPrice",
    minWidth: 140,
    render: (row: IOrderRecordItems) => {
      return h(
          'span',
          {class: 'money-color'},
          `$${ row.totalPrice }`
      )
    }
  },
  {
    title: () => 'Action',
    key: 'action',
    fixed: 'right',
    width: 140,
    render(row: IOrderRecordItems) {
      return h(
          NSpace,
          null,
          {
            default: () => {
              return [
                h(
                    NButton,
                    {
                      text: true,
                      type: "info",
                      onClick: () => viewOrderDetails(row)
                    },
                    {default: () => 'Details'}
                ),
                h(
                    NButton,
                    {
                      text: true,
                      type: "info",
                      onClick: () => viewOrderDetails(row)
                    },
                    {default: () => 'Renewal'}
                )
              ]
            }
          }
      )
    }
  }
])

const loadLocalOrderProgress = async () => {
  loading.value = true
  localOrderRecord.value = await getLocalOrderRecords()
  loading.value = false
}

const viewOrderDetails = async (data: IOrderRecordItems) => {
  navigateTo(localePath(`/order/details?orderId=${ data.orderId }`))
}

const getRowKey = (row: any) => row.orderId

const goToBuy = () => {
  navigateTo(localePath('/#buy'))
}

onMounted(() => {
  // @ts-ignore
  import.meta.client && loadLocalOrderProgress()
})
</script>

<template>
  <div class="order-record-page">
    <!--    flex-height-->
    <n-data-table
        remote
        class="tables auto-layout"
        :loading="loading"
        :columns="columns"
        :data="localOrderRecord"
        :row-key="getRowKey"
    >
      <template #empty>
        <n-empty description="No orders yet, create one now!">
          <template #icon>
            <Icon class="icon" mode="svg" name="material-symbols:shopping-bag-speed"/>
          </template>
          <template #extra>
            <n-button type="primary" @click="goToBuy">now buy</n-button>
          </template>
        </n-empty>
      </template>
    </n-data-table>
  </div>
</template>

<style scoped lang="scss">
.order-record-page {
  flex: 1;
  width: 100%;
  height: 100%;
  font-weight: bold;
  display: flex;
  gap: 20px;
  flex-direction: column;

  .tables {
    //flex: 1;
    margin: 40px auto;
  }

  .local-order-record {
    width: 1280px;
  }
}
</style>
