<script
  setup
  lang="ts"
>
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue'

  import CircuitBoard from './CircuitBoard.vue'
  import CircuitChart from './CircuitChart.vue'
  import CircuitPalette from './CircuitPalette.vue'
  import CommonDropzone from './CommonDropzone.vue'
  import ServerStatus from './ServerStatus.vue'
  import {
    handleMouseDownQuantumCircuit,
    handleMouseLeaveQuantumCircuit,
    handleMouseMoveQuantumCircuit,
    handleMouseUpQuantumCircuit
  } from './Event'
  import { isGateInDragDropzone } from './Gate'
  import { getEncodedCircuit } from './server/Encoder'
  import {
    checkingCircuitGatesError,
    circuitGates,
    dragDropzoneGate,
    dragDropzonePos,
    getCircuitGatesErrorNum,
    getStepNum,
    initCircuit,
    initPalette,
    paletteGates,
    stepSelect
  } from './store/Circuit'
  import { sendRequest, ws } from './server/Server'
  import SampleControl from './SampleControl.vue'
  import CircuitEditor from './CircuitEditor.vue'

  initPalette()
  initCircuit()
</script>

<template>
  <div
    class="circuit"
    @mouseleave="handleMouseLeaveQuantumCircuit()"
    @mousedown="handleMouseDownQuantumCircuit()"
    @mouseup="handleMouseUpQuantumCircuit()"
    @mousemove="handleMouseMoveQuantumCircuit($event)"
  >
    <ServerStatus />
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
    <div style="display: flex; flex-direction: row">
      <div style="display: flex; flex-direction: column; margin-right: 2rem">
        <SampleControl />
        <CircuitEditor />
      </div>
      <CircuitChart class="circuit-chart" />
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
    align-items: flex-start;
    padding: var(--circuit-padding);
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
    /* align-self: center; */
  }
</style>
