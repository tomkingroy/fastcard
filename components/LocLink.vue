<!-- components/LocLink.vue -->

<script setup lang="ts">
defineProps(["to"])

const localePath = useLocalePath()
</script>

<template>
  <NuxtLink style="width: 100%;height: 100%;padding: 0;" :to="localePath(to)"><slot /></NuxtLink>
</template>