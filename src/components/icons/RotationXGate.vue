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
      d="M12.3214 35V24M18 24.5L21.7303 35M12.3214 24V13C21 13 22 15.5 22 18.5C22 21.5 21 24 12.3214 24Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M34.6093 13.0016L24.7475 35"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M24.8187 13.0016L34.6093 35"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
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
      "gate.display == Display.Drag ? 'var(--gate-background-color-purple)' : gate.valueValid ? 'var(--gate-background-color-green)' : 'var(--gate-color-gray)'"
    );
  }
</style>
