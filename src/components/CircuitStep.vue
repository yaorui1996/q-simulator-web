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
      class="circuit-dropzone-container"
      v-for="(circuitDropzoneGate, index) in stepGates"
      :key="index"
      @mousemove.stop="handleMouseMoveCircuitStep($event, circuitDropzoneGate)"
    >
      <CommonDropzone :gate="circuitDropzoneGate" />
    </div>
  </div>
</template>

<style scoped>
  .circuit-step {
    border: 0px solid blue;
    display: flex;
    flex-direction: column;
  }

  .circuit-dropzone-container {
    height: 48px;
    width: 24px;
    border: 0px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
