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
  import { probabilityBar, stateVectorBar } from './store/Chart'
  import {
    circuitGates,
    dragDropzoneGate,
    dragDropzonePos,
    getRegisterNum,
    getStepNum,
    initCircuit,
    initPalette,
    paletteGates,
    trimCircuit
  } from './store/Circuit'
  import {
    ComputationCache,
    computationCaches,
    getCircuitLatestSample,
    Measurement,
    State
  } from './store/Computation'
  import { reassignArray } from './utils/Array'

  initPalette()
  initCircuit()
  trimCircuit()

  function click() {
    const computationCache: ComputationCache = {
      circuit: JSON.stringify(circuitGates),
      samples: [
        {
          states: [],
          measurements: []
        }
      ]
    }
    for (let i: number = 0; i < getStepNum(); i++) {
      const state: State = {
        realParts: [],
        imaginaryParts: [],
        probabilities: []
      }
      const registerNum = getRegisterNum()
      const stateNum = Math.pow(2, registerNum)
      for (let j = 0; j < stateNum; j++) {
        const name: string = j.toString(2).padStart(registerNum, '0')
        const phi: number = Math.random() * Math.PI * 2
        state.realParts.push((1 / Math.sqrt(stateNum)) * Math.cos(phi))
        state.imaginaryParts.push((1 / Math.sqrt(stateNum)) * Math.sin(phi))
        state.probabilities.push(1 / Math.sqrt(stateNum))
      }
      computationCache.samples[0].states.push(state)
    }
    circuitGates.forEach((stepGates) =>
      stepGates.forEach((gate) => {
        if (gate.name == GateName.Measurement) {
          const measurement: Measurement = {
            step: gate.step,
            register: gate.register,
            value: Math.random() > 0.5 ? 1 : 0
          }
          computationCache.samples[0].measurements.push(measurement)
        }
      })
    )

    computationCaches.unshift(computationCache)

    const latestSample = getCircuitLatestSample(JSON.stringify(circuitGates))

    reassignArray(stateVectorBar.realParts, latestSample.states[0].realParts)
    reassignArray(
      stateVectorBar.imaginaryParts,
      latestSample.states[0].imaginaryParts
    )
    reassignArray(
      probabilityBar.probabilities,
      latestSample.states[0].probabilities
    )
    latestSample.measurements.forEach((measurement) => {
      circuitGates[measurement.step][measurement.register].value =
        measurement.value.toString()
    })
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
