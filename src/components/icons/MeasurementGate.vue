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
      d="M8 35C8 30.7565 9.68571 26.6869 12.6863 23.6863C15.6869 20.6857 19.7565 19 24 19C28.2435 19 32.3131 20.6857 35.3137 23.6863C38.3143 26.6869 40 30.7565 40 35"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M24.5 33L35 15"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M24.5 34.5C25.3284 34.5 26 33.8284 26 33C26 32.1716 25.3284 31.5 24.5 31.5C23.6716 31.5 23 32.1716 23 33C23 33.8284 23.6716 34.5 24.5 34.5Z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="value">{{ value }}</div>
</template>

<style scoped>
  svg {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    color: v-bind(
      "display == Display.Grabbed ? 'rgb(192, 132, 252)' : inCircuitDropzone ? 'rgb(229, 229, 229)' : 'rgb(168, 85, 247)'"
    );
    background-color: v-bind("display == Display.Grabbed ? 'rgb(168, 85, 247)' : 'rgb(249, 250, 251)'");
  }

  .value {
    position: absolute;
    display: flex;
    justify-content: center;
    color: v-bind(
      "display == Display.Grabbed ? 'rgb(255, 255, 255)' : value == '0' ? 'rgb(239, 68, 68)' : 'rgb(59, 130, 246)'"
    );
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  }
</style>
