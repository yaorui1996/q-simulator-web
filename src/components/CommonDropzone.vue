<script
  setup
  lang="ts"
>
  import {
    handleMouseDownCircuitDropzone,
    handleMouseDownPaletteDropzone,
    handleMouseEnterCircuitDropzone,
    handleMouseEnterPaletteDropzone,
    handleMouseLeaveCircuitDropzone,
    handleMouseLeavePaletteDropzone,
    handleMouseUpCircuitDropzone,
    handleMouseUpPaletteDropzone
  } from './Event'
  import {
    Display,
    Gate,
    GateName,
    isGateInCircuitDropzone,
    isGateInPaletteDropzone
  } from './Gate'
  import ControlGate from './icons/ControlGate.vue'
  import DropzoneWires from './icons/DropzoneWires.vue'
  import MeasurementGate from './icons/MeasurementGate.vue'
  import NullYGate from './icons/NullGate.vue'
  import PauliXGate from './icons/PauliXGate.vue'
  import PauliYGate from './icons/PauliYGate.vue'
  import WriteGate from './icons/WriteGate.vue'

  const props = defineProps<{ gate: Gate }>()

  const gateElements: { [key in GateName]: object } = {
    [GateName.Null]: NullYGate,
    [GateName.PauliX]: PauliXGate,
    [GateName.PauliY]: PauliYGate,
    [GateName.Control]: ControlGate,
    [GateName.Write]: WriteGate,
    [GateName.Measurement]: MeasurementGate
  }

  function onMouseEnter(eventGate: Gate): void {
    if (isGateInPaletteDropzone(eventGate)) {
      handleMouseEnterPaletteDropzone(eventGate)
    } else if (isGateInCircuitDropzone(eventGate)) {
      handleMouseEnterCircuitDropzone(eventGate)
    }
  }

  function onMouseLeave(eventGate: Gate): void {
    if (isGateInPaletteDropzone(eventGate)) {
      handleMouseLeavePaletteDropzone(eventGate)
    } else if (isGateInCircuitDropzone(eventGate)) {
      handleMouseLeaveCircuitDropzone(eventGate)
    }
  }

  function onMouseDown(eventGate: Gate): void {
    if (isGateInPaletteDropzone(eventGate)) {
      handleMouseDownPaletteDropzone(eventGate)
    } else if (isGateInCircuitDropzone(eventGate)) {
      handleMouseDownCircuitDropzone(eventGate)
    }
  }

  function onMouseUp(eventGate: Gate): void {
    if (isGateInPaletteDropzone(eventGate)) {
      handleMouseUpPaletteDropzone()
    } else if (isGateInCircuitDropzone(eventGate)) {
      handleMouseUpCircuitDropzone(eventGate)
    }
  }
</script>

<template>
  <div class="dropzone">
    <DropzoneWires
      class="circuit-wires"
      v-if="isGateInCircuitDropzone(gate)"
      :wire-input="gate.wireInput"
      :wire-output="gate.wireOutput"
      :connect-top="gate.connectTop"
      :connect-bottom="gate.connectBottom"
    />
    <div
      class="gate-container"
      :class="gate.name == GateName.Null ? 'z-0' : 'z-10'"
      @mouseenter="onMouseEnter(gate)"
      @mouseleave="onMouseLeave(gate)"
      @mousedown.stop="onMouseDown(gate)"
      @mouseup.stop="onMouseUp(gate)"
    >
      <component
        :is="gateElements[gate.name]"
        :value="gate.value"
        :display="gate.display"
        :in-circuit-dropzone="isGateInCircuitDropzone(gate)"
      />
    </div>
  </div>
</template>

<style scoped>
  .dropzone {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gate-container {
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 6px;
    cursor: v-bind("props.gate.name == GateName.Null ? 'default' : 'grab'");
    border-width: v-bind(
      "gate.display == Display.Focus || gate.display == Display.Select ? '2px' : '0'"
    );
    border-style: solid;
    border-color: v-bind(
      "gate.display === Display.Select ? 'rgb(168, 85, 247)' : 'rgb(163, 163, 163)'"
    );
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circuit-wires {
    position: absolute;
  }
</style>
