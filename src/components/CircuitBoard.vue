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
  <div class="circuit-board-container">
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
