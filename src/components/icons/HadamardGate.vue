<script
  setup
  lang="ts"
>
  import { Display, Gate } from '../Gate'

  defineProps<{
    gate: Gate
  }>()
</script>

<template>
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 13V35M17 24H31M31 13V35"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
  svg {
    border-radius: var(--gate-border-radius);
    width: var(--gate-width);
    height: var(--gate-height);
    color: var(--gate-color-white);
    background-color: v-bind(
      "gate.display == Display.Drag ? 'var(--gate-background-color-purple)' : 'var(--gate-background-color-green)'"
    );
  }
</style>
