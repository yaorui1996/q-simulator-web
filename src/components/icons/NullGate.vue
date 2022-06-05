<script
  setup
  lang="ts"
>
  import { Display } from '../Gate'

  defineProps<{
    value: string
    display: Display
    inCircuitDropzone: boolean
  }>()
</script>

<template>
  <svg />
</template>

<style scoped>
  svg {
    width: var(--gate-width);
    height: var(--gate-height);
  }
</style>
