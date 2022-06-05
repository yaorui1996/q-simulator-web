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
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 36L36 12M12 12L36 36"
      stroke="currentColor"
      stroke-width="4"
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
    color: v-bind(
      "display == Display.Drag ? 'var(--gate-color-white)' : value == '1' ? 'var(--gate-color-green)' : 'var(--gate-color-gray)'"
    );
    background-color: v-bind(
      "display == Display.Drag ? 'var(--gate-color-purple-500)' : transparent"
    );
  }
</style>
