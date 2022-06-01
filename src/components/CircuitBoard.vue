<script
  setup
  lang="ts"
>
  import CircuitStep from './CircuitStep.vue'
  import { emitter } from './Emitter'
  import { Gate, initGateBlank, isGateInCircuitDropzone, isGateValid } from './Gate'

  const props = defineProps<{ circuit: Gate[][]; gateDragging: Gate }>()

  function mouseleave() {
    if (isGateValid(props.gateDragging)) {
      emitter.emit('removeCircuitDropzone')
      if (isGateValid(props.gateDragging) && isGateInCircuitDropzone(props.gateDragging)) {
        initGateBlank(props.gateDragging, props.gateDragging.name, props.gateDragging.value)
      }
    }
  }
</script>

<template>
  <div class="circuit-board-container">
    <div
      class="circuit-board"
      @mouseleave="mouseleave"
    >
      <CircuitStep
        :step="step"
        v-for="(step, index) in circuit"
        :key="index"
        :gate-dragging="gateDragging"
      />
    </div>
  </div>
</template>

<style scoped>
  .circuit-board {
    margin: 60px 10px 10px 10px;
    border: 0px solid green;
    display: flex;
    flex-direction: row;
  }
</style>
