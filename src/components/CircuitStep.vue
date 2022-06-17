<script
  setup
  lang="ts"
>
  import CommonDropzone from './CommonDropzone.vue'
  import {
    handleMouseMoveCircuitStep,
    handleMouseDownCircuitStep
  } from './Event'
  import { Gate, GateName, Display, valueEditableGates } from './Gate'
  import { stepFocus, stepSelect } from './store/Circuit'
  import GateEditor from './GateEditor.vue'
  import GateMonitor from './GateMonitor.vue'
  import { getEncodedCircuit } from './server/Encoder'

  defineProps<{ stepGates: Gate[] }>()
  function click(gate: Gate) {
    // console.log(eval(gate.value))
    console.log(getEncodedCircuit())
  }
</script>

<template>
  <div class="circuit-step">
    <div
      v-for="(circuitDropzoneGate, index) in stepGates"
      :key="index"
      class="circuit-dropzone-container"
      @mousemove.stop="handleMouseMoveCircuitStep($event, circuitDropzoneGate)"
      @mousedown.stop="handleMouseDownCircuitStep(circuitDropzoneGate)"
    >
      <GateEditor
        class="gate-editor"
        v-if="circuitDropzoneGate.display == Display.Select"
        :gate="circuitDropzoneGate"
        @click="click(circuitDropzoneGate)"
      />
      <GateMonitor
        class="gate-monitor"
        v-if="
          valueEditableGates.includes(circuitDropzoneGate.name) &&
          circuitDropzoneGate.display !== Display.Select
        "
        :value="circuitDropzoneGate.value"
      />
      <CommonDropzone :gate="circuitDropzoneGate" />
    </div>
    <div
      class="step-selector"
      v-if="stepGates[0].step % 2 == 0 && stepGates[0].step > 0"
    ></div>
  </div>
</template>

<style scoped>
  .circuit-step {
    position: relative;
    width: var(--step-width);
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .circuit-dropzone-container {
    position: relative;
    width: var(--circuit-dropzone-container-width);
    height: var(--circuit-dropzone-container-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gate-editor {
    position: absolute;
    top: var(--gate-editor-top);
    z-index: 30;
  }
  .gate-monitor {
    position: absolute;
    top: var(--gate-monitor-top);
    z-index: 30;
    font-size: var(--gate-editor-font-size);
    font-family: var(--gate-editor-font-family);
    color: var(--gate-editor-font-color-black);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }

  .step-selector {
    position: absolute;
    width: var(--step-selector-width);
    height: 100%;
    opacity: v-bind(
      'stepGates[0].step == stepSelect ? 1 : stepGates[0].step == stepFocus ? 0.3 : 0'
    );
    background-color: var(--step-selector-background-color-blue);
    pointer-events: none;
  }
</style>
