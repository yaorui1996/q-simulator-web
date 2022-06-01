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
  <p></p>
</template>

<style scoped>
  p {
    width: 32px;
    height: 32px;
  }
</style>
