<script
  setup
  lang="ts"
>
  defineProps<{
    wireInput: boolean
    wireOutput: boolean
    connectTop: boolean
    connectBottom: boolean
  }>()
</script>

<template>
  <svg
    class="wires"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    preserveAspectRatio="none"
  >
    <line
      class="wire-input"
      x1="0"
      y1="24"
      x2="24"
      y2="24"
      stroke="currentColor"
      stroke-width="2"
      vector-effect="non-scaling-stroke"
    />
    <line
      class="wire-output"
      x1="24"
      y1="24"
      x2="48"
      y2="24"
      stroke="currentColor"
      stroke-width="2"
      vector-effect="non-scaling-stroke"
    />
    <line
      class="connect-top"
      x1="24"
      y1="0"
      x2="24"
      y2="24"
      stroke="currentColor"
      stroke-width="4"
      vector-effect="non-scaling-stroke"
    />
    <line
      class="connect-bottom"
      x1="24"
      y1="48"
      x2="24"
      y2="24"
      stroke="currentColor"
      stroke-width="4"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<style scoped>
  .wires {
    width: var(--circuit-dropzone-wires-width);
  }

  .wire-input {
    color: v-bind(
      "wireInput?'var(--wire-enable-color)':'var(--wire-disable-color)'"
    );
  }

  .wire-output {
    color: v-bind(
      "wireOutput?'var(--wire-enable-color)':'var(--wire-disable-color)'"
    );
  }

  .connect-top {
    color: v-bind(
      "connectTop?'var(--connect-enable-color)':'var(--connect-disable-color)'"
    );
  }

  .connect-bottom {
    color: v-bind(
      "connectBottom?'var(--connect-enable-color)':'var(--connect-disable-color)'"
    );
  }
</style>
