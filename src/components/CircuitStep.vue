<script
  setup
  lang="ts"
>
  import CommonDropzone from './CommonDropzone.vue'
  import { handleMouseMoveCircuitStep } from './Event'
  import { Gate } from './Gate'

  defineProps<{ stepGates: Gate[] }>()
</script>

<template>
  <div class="circuit-step">
    <div
      v-for="(circuitDropzoneGate, index) in stepGates"
      :key="index"
      class="circuit-dropzone-container"
      @mousemove.stop="handleMouseMoveCircuitStep($event, circuitDropzoneGate)"
    >
      <CommonDropzone :gate="circuitDropzoneGate" />
    </div>
  </div>
</template>

<style scoped>
  .circuit-step {
    position: relative;
    width: var(--step-width);
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .circuit-dropzone-container {
    position: relative;
    width: var(--circuit-dropzone-container-width);
    height: var(--circuit-dropzone-container-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
