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
      d="M17 13L24 24M24 24L31 13M24 24V35"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
  svg {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    background-color: v-bind(
      "display == Display.Drag ? 'rgb(168, 85, 247)' : 'rgb(16, 185, 129)'"
    );
  }
</style>
