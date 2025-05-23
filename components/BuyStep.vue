<script setup lang="ts">
// Select the current step process according to the order status
const currentSteps = [
  {
    "title": "Prepay Order Amount",
    "description": "Please do not use incognito mode while making a purchase to ensure you can retrieve your IP information if not saved.",
    "status": "success"
  },
  {
    "title": "Scan to Pay",
    "description": "We accept cryptocurrency payments. The payment amount must match the displayed amount exactly (including decimal precision).",
    "status": "process"
  },
  {
    "title": "Process Order / IP Allocation",
    "description": "After successful payment, we will allocate IPs based on your order details.",
    "status": "wait"
  },
  {
    "title": "Save Account Information",
    "description": "Please copy and securely save your account details immediately, and verify the link's functionality.",
    "status": "wait"
  }
]
</script>

<template>
  <div  class="buy-step">
    <h1>Purchase Process</h1>
<!--    <el-steps
        :space="300"
        finish-status="success"
        align-center
    >
      <el-step
          v-for="(step, index) in currentSteps"
          :key="index"
          :title="step.title"
          :description="step.description"
          :status="step.status"
      />
    </el-steps>-->
  </div>
</template>

<style scoped lang="scss">
.buy-step {
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  justify-content: center;

  h1{
    font-size: 30px;
  }
}
</style>
