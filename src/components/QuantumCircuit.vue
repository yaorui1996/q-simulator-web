<script
  setup
  lang="ts"
>
  import CircuitBoard from './CircuitBoard.vue'
  import CircuitPalette from './CircuitPalette.vue'
  import CommonDropzone from './CommonDropzone.vue'
  import {
    handleMouseDownQuantumCircuit,
    handleMouseLeaveQuantumCircuit,
    handleMouseMoveQuantumCircuit,
    handleMouseUpQuantumCircuit
  } from './Event'
  import { GateName, isGateInDragDropzone } from './Gate'
  import {
    circuitGates,
    dragDropzoneGate,
    dragDropzonePos,
    initCircuit,
    initPalette,
    paletteGates,
    trimCircuit
  } from './Store'

  initPalette()
  initCircuit()
  circuitGates[0][1].name = GateName.PauliX
  circuitGates[1][0].name = GateName.PauliX
  circuitGates[1][1].name = GateName.PauliY
  circuitGates[2][1].name = GateName.PauliX
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
    <CircuitPalette
      class="circuit-palette"
      :palette-gates="paletteGates"
    />
    <CircuitBoard
      class="circuit-board"
      :circuit-gates="circuitGates"
    />
    <div class="drag-dropzone-container">
      <CommonDropzone
        :gate="dragDropzoneGate"
        v-if="isGateInDragDropzone(dragDropzoneGate)"
      />
    </div>
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
  }

  .circuit-palette {
    position: relative;
  }

  .circuit-board {
    position: relative;
  }

  .drag-dropzone-container {
    position: absolute;
    left: v-bind("dragDropzonePos.left.toString() + 'px'");
    top: v-bind("dragDropzonePos.top.toString() + 'px'");
    pointer-events: none;
  }
</style>
