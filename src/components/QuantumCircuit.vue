<script
  setup
  lang="ts"
>
  import { ref } from 'vue'

  import CircuitBoard from './CircuitBoard.vue'
  import CircuitPalette from './CircuitPalette.vue'
  import CommonDropzone from './CommonDropzone.vue'
  import {
    handleMouseDownQuantumCircuit,
    handleMouseUpQuantumCircuit
  } from './Event'
  import { GateName, isGateInDragDropzone, isGateValid } from './Gate'
  import {
    circuitGates,
    dragDropzoneGate,
    initCircuit,
    initPalette,
    paletteGates,
    trimCircuit
  } from './Store'

  initPalette()
  initCircuit()

  const x = ref<string>('0')
  const y = ref<string>('0')

  circuitGates[0][1].name = GateName.PauliX
  circuitGates[1][0].name = GateName.PauliX
  circuitGates[1][1].name = GateName.PauliY
  circuitGates[2][1].name = GateName.PauliX
  trimCircuit()

  function mousemove(event: MouseEvent) {
    console.log('mousemovequantumcircuit')
    x.value = event.pageX - 34 / 2 + 'px'
    y.value = event.pageY - 34 / 2 + 'px'
  }
</script>

<template>
  <div
    class="circuit"
    @mousemove="mousemove"
    @mousedown="handleMouseDownQuantumCircuit()"
    @mouseup="handleMouseUpQuantumCircuit()"
  >
    <CircuitPalette
      class="circuit-palette"
      :paletteGates="paletteGates"
    />
    <CircuitBoard
      class="circuit-board"
      :circuitGates="circuitGates"
    />
    <div
      class="drag-dropzone-container"
      style="position: absolute"
    >
      <CommonDropzone
        class="drag-dropzone"
        :gate="dragDropzoneGate"
        v-if="
          isGateInDragDropzone(dragDropzoneGate) &&
          isGateValid(dragDropzoneGate)
        "
      />
    </div>
  </div>
</template>

<style scoped>
  .circuit {
    user-select: none;
    /* overflow: auto; */
    background-color: rgb(249, 250, 251);
    display: flex;
    flex-direction: column;
    cursor: v-bind("isGateValid(dragDropzoneGate) ? 'default' : 'grab'");
  }

  .drag-dropzone-container {
    position: absolute;
    width: 38px;
    height: 38px;
    left: v-bind(x);
    top: v-bind(y);
    pointer-events: none;
  }

  .circuit-palette {
    position: relative;
    border: 0px solid red;
  }

  .circuit-board {
    position: relative;
  }
</style>
