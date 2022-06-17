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
    isGateInPaletteDropzone,
    isGateValid
  } from './Gate'
  import CircuitDropzoneWires from './icons/CircuitDropzoneWires.vue'
  import ControlGate from './icons/ControlGate.vue'
  import HadamardGate from './icons/HadamardGate.vue'
  import MeasurementGate from './icons/MeasurementGate.vue'
  import NullYGate from './icons/NullGate.vue'
  import PauliXGate from './icons/PauliXGate.vue'
  import PauliYGate from './icons/PauliYGate.vue'
  import PauliZGate from './icons/PauliZGate.vue'
  import SGate from './icons/SGate.vue'
  import RotationXGate from './icons/RotationXGate.vue'
  import RotationYGate from './icons/RotationYGate.vue'
  import RotationZGate from './icons/RotationZGate.vue'
  import SquareRootXGate from './icons/SquareRootXGate.vue'
  import SwapGate from './icons/SwapGate.vue'
  import TGate from './icons/TGate.vue'
  import WriteGate from './icons/WriteGate.vue'

  defineProps<{ gate: Gate }>()

  const gateElements: { [key in GateName]: object } = {
    [GateName.Null]: NullYGate,
    [GateName.Hadamard]: HadamardGate,
    [GateName.PauliX]: PauliXGate,
    [GateName.PauliY]: PauliYGate,
    [GateName.PauliZ]: PauliZGate,
    [GateName.S]: SGate,
    [GateName.T]: TGate,
    [GateName.SquareRootX]: SquareRootXGate,
    [GateName.RotationX]: RotationXGate,
    [GateName.RotationY]: RotationYGate,
    [GateName.RotationZ]: RotationZGate,
    [GateName.Swap]: SwapGate,
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

  function onMouseDown(event: MouseEvent, eventGate: Gate): void {
    if (isGateInPaletteDropzone(eventGate)) {
      handleMouseDownPaletteDropzone(event, eventGate)
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
    <CircuitDropzoneWires
      class="circuit-wires"
      v-if="isGateInCircuitDropzone(gate)"
      :wire-input-hidden="gate.step == 0"
      :wire-input="gate.wireInput"
      :wire-output="gate.wireOutput"
      :connect-top="gate.connectTop"
      :connect-bottom="gate.connectBottom"
    />
    <div
      class="gate-container"
      v-if="gate.name !== GateName.Null"
      @mouseenter="onMouseEnter(gate)"
      @mouseleave="onMouseLeave(gate)"
      @mousedown.stop="onMouseDown($event, gate)"
      @mouseup.stop="onMouseUp(gate)"
    >
      <component
        :is="gateElements[gate.name]"
        :gate="gate"
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
  .circuit-wires {
    position: absolute;
  }
  .gate-container {
    position: relative;
    z-index: v-bind('isGateValid(gate) ? 20 : gate.step % 2 == 0 ? 10 : 0');
    cursor: v-bind("isGateValid(gate)? 'var(--cursor-grab)' : 'default'");
    border-radius: var(--gate-container-border-radius);
    border-width: var(--gate-container-border-width);
    border-style: solid;
    border-color: v-bind(
      "gate.display == Display.Select ? 'var(--gate-container-border-corlor-purple)' : gate.display == Display.Focus ? 'var(--gate-container-border-corlor-neutral-400)' : 'transparent'"
    );
    padding: var(--gate-container-padding);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
