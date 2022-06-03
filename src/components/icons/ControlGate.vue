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
      d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z"
      fill="currentColor"
    />
  </svg>
</template>

<style scoped>
  svg {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    color: v-bind(
      "display == Display.Drag ? 'rgb(255, 255, 255)' : 'rgb(16, 185, 129)'"
    );
    background-color: v-bind(
      "display == Display.Drag ? 'rgb(168, 85, 247)' : 'transparent'"
    );
  }
</style>
