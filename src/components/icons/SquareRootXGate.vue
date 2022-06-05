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
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M10 24L13 24L14 36L17 36L18 12L38 12" />
    <path d="M24 32L34 18M34 32L24 18" />
  </svg>
</template>

<style scoped>
  svg {
    border-radius: var(--gate-border-radius);
    width: var(--gate-width);
    height: var(--gate-height);
    color: var(--gate-color-white);
    background-color: v-bind(
      "display == Display.Drag ? 'var(--gate-background-color-purple)' : 'var(--gate-background-color-green)'"
    );
  }
</style>
