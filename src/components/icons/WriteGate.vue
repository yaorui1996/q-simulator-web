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
      d="M9 10V40M34 10L40 24L34 40"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div
    class="value"
    v-bind="{
      drag: display == Display.Drag,
      value: value
    }"
  >
    {{ value }}
  </div>
</template>

<style scoped>
  svg {
    border-radius: var(--gate-border-radius);
    width: var(--gate-width);
    height: var(--gate-height);
    color: v-bind(
      "display == Display.Drag ? 'var(--gate-color-white)' : 'var(--gate-color-neutral-500)'"
    );
    background-color: v-bind(
      "display == Display.Drag ? 'var(--gate-background-color-purple)' : inCircuitDropzone ? 'var(--gate-background-color-gray)' : 'var(--gate-background-color-white)'"
    );
  }

  .value {
    position: absolute;
    display: flex;
    justify-content: center;
    color: v-bind(
      "display == Display.Drag ? 'var(--gate-color-white)' : value == '1' ? 'var(--gate-color-blue)' : 'var(--gate-color-red)'"
    );
    font-family: var(--write-gate-font-family);
  }
</style>
