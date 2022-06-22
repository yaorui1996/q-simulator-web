<script
  setup
  lang="ts"
>
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue'
  import { inject } from 'vue'

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
    stepSelect,
    trimCircuit
  } from './store/Circuit'
  import { ws, fun } from './server/Server'

  fun()

  initPalette()
  initCircuit()

  const elMessage = ref<HTMLElement>()

  function click() {
    const errorNum: number = getCircuitGatesErrorNum()
    if (errorNum > 0) {
      checkingCircuitGatesError.value = true
      ElMessage({
        showClose: true,
        message:
          getCircuitGatesErrorNum() > 1
            ? `Oops, there are ${getCircuitGatesErrorNum()} errors in the circuit.`
            : `Oops, there is 1 error in the circuit.`,
        type: 'error',
        grouping: true,
        appendTo: elMessage.value
      })
      console.clear()
      console.log(JSON.stringify(getEncodedCircuit(), undefined, 2))
    } else {
      checkingCircuitGatesError.value = false
      ws.send(JSON.stringify(getEncodedCircuit()))
      // console.log(JSON.stringify(getEncodedCircuit()))
      // sampleCircuit(1, true)
      if (stepSelect.value == 0) {
        stepSelect.value = getStepNum() - 1
      }
      // changeChartDataToStepSelectStateVector()
    }
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
    <div
      ref="elMessage"
      style="pointer-events: none"
    ></div>
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
