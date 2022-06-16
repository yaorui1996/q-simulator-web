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
      d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z"
      fill="currentColor"
    />
  </svg>
</template>

<style scoped>
  svg {
    border-radius: var(--gate-border-radius);
    width: var(--gate-width);
    height: var(--gate-height);
    color: v-bind(
      "gate.display == Display.Drag ? 'var(--gate-color-white)' : gate.value == '1' ? 'var(--gate-color-green)' : 'var(--gate-color-gray)'"
    );
    background-color: v-bind(
      "gate.display == Display.Drag ? 'var(--gate-color-purple-500)' : 'transparent'"
    );
  }
</style>
