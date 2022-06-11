<script
  setup
  lang="ts"
>
  import CircuitBoard from './CircuitBoard.vue'
  import CircuitChart from './CircuitChart.vue'
  import CircuitPalette from './CircuitPalette.vue'
  import CommonDropzone from './CommonDropzone.vue'
  import {
    handleMouseDownQuantumCircuit,
    handleMouseLeaveQuantumCircuit,
    handleMouseMoveQuantumCircuit,
    handleMouseUpQuantumCircuit
  } from './Event'
  import { isGateInDragDropzone } from './Gate'
  import { getCircuitJson } from './server/Encoder'
  import {
    circuitGates,
    dragDropzoneGate,
    dragDropzonePos,
    initCircuit,
    initPalette,
    paletteGates,
    trimCircuit
  } from './store/Circuit'

  initPalette()
  initCircuit()
  trimCircuit()
</script>

<template>
  <div
    class="circuit"
    @mouseleave="handleMouseLeaveQuantumCircuit()"
    @mousedown="handleMouseDownQuantumCircuit()"
    @mouseup="handleMouseUpQuantumCircuit()"
    @mousemove="handleMouseMoveQuantumCircuit($event)"
  >
    <div class="drag-dropzone-container">
      <CommonDropzone
        :gate="dragDropzoneGate"
        v-if="isGateInDragDropzone(dragDropzoneGate)"
      />
    </div>
    <CircuitPalette
      class="circuit-palette"
      :palette-gates="paletteGates"
    />
    <CircuitBoard
      class="circuit-board"
      :circuit-gates="circuitGates"
    />
    <CircuitChart class="circuit-chart" />
  </div>
</template>

<style scoped>
  .circuit {
    user-select: none;
    /* overflow: auto; */
    cursor: v-bind(
      "isGateInDragDropzone(dragDropzoneGate) ? 'var(--cursor-grab)' : 'default'"
    );
    position: relative;
    width: fit-content;
    background-color: var(--circuit-background-color-gray);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .drag-dropzone-container {
    position: absolute;
    left: v-bind("dragDropzonePos.left.toString() + 'px'");
    top: v-bind("dragDropzonePos.top.toString() + 'px'");
    pointer-events: none;
  }

  .circuit-palette {
    position: relative;
  }

  .circuit-board {
    position: relative;
  }

  .circuit-chart {
    position: relative;
    align-self: center;
  }
</style>
