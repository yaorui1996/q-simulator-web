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
  >
    <path d="M17 24A7 7 0 1 0 31 24A7 7 0 1 0 17 24M19 34L29 13" />
  </svg>
</template>

<style scoped>
  svg {
    border-radius: 9999rem;
    width: var(--gate-width);
    height: var(--gate-height);
    color: var(--gate-color-white);
    background-color: v-bind(
      "display == Display.Drag ? 'var(--gate-background-color-purple)' : 'var(--gate-background-color-green)'"
    );
  }
</style>
