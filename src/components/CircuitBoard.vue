<script
  setup
  lang="ts"
>
  import CircuitStep from './CircuitStep.vue'
  import {
    handleMouseEnterCircuitBoard,
    handleMouseLeaveCircuitBoard
  } from './Event'
  import { Gate } from './Gate'

  defineProps<{ circuitGates: Gate[][] }>()
</script>

<template>
  <div
    class="circuit-board"
    @mouseenter="handleMouseEnterCircuitBoard()"
    @mouseleave="handleMouseLeaveCircuitBoard()"
  >
    <CircuitStep
      v-for="(stepGates, index) in circuitGates"
      :key="index"
      :stepGates="stepGates"
    />
  </div>
</template>

<style scoped>
  .circuit-board {
    margin: var(--board-margin);
    display: flex;
    width: fit-content;
  }
</style>
