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
  import { GateName, isGateInDragDropzone } from './Gate'
  import {
    changeChartDataToStepSelectStateVector,
    probabilityBar,
    stateVectorBar
  } from './store/Chart'
  import {
    circuitGates,
    dragDropzoneGate,
    dragDropzonePos,
    getRegisterNum,
    getStepNum,
    initCircuit,
    initPalette,
    paletteGates,
    stepSelect,
    trimCircuit
  } from './store/Circuit'
  import {
    computation,
    sampleCircuit,
    updateCircuitMeasurement
  } from './store/Computation'

  initPalette()
  initCircuit()
  trimCircuit()

  function click() {
    sampleCircuit(1, true)
    if (stepSelect.value == 0) {
      stepSelect.value = getStepNum() - 1
    }
    changeChartDataToStepSelectStateVector()
    updateCircuitMeasurement(computation.samples[0].measurements)
  }
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
    <div
      class="sample-button"
      @click="click"
    >
      Sample
    </div>
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

  .sample-button {
    margin: 0 2rem 2rem 2rem;
    padding: 0.5rem 1rem;
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 9999rem;
  }

  .circuit-chart {
    position: relative;
    align-self: center;
  }
</style>
