<script
  setup
  lang="ts"
>
  import { Gate } from '../Gate'

  defineProps<{
    gate: Gate
  }>()
</script>

<template></template>

<style scoped>
  svg {
    width: var(--gate-width);
    height: var(--gate-height);
  }
</style>
