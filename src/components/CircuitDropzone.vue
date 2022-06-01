<script
  setup
  lang="ts"
>
  import { ref } from 'vue'

  import { emitter } from './Emitter'
  import {
    Display,
    Gate,
    initGateBlank,
    isGateInCircuitDropzone,
    isGateValid,
    setGateDisplay,
    setGateValue
  } from './Gate'
  import ControlGate from './icons/ControlGate.vue'
  import DropzoneWires from './icons/DropzoneWires.vue'
  import MeasurementGate from './icons/MeasurementGate.vue'
  import NullYGate from './icons/NullGate.vue'
  import PauliXGate from './icons/PauliXGate.vue'
  import PauliYGate from './icons/PauliYGate.vue'
  import WriteGate from './icons/WriteGate.vue'

  const props = defineProps<{
    gate: Gate
    gateDragging: Gate
  }>()

  const gateElements: { [key: string]: object } = {
    Null: NullYGate,
    PauliX: PauliXGate,
    PauliY: PauliYGate,
    Control: ControlGate,
    Write: WriteGate,
    Measurement: MeasurementGate
  }

  const borderWidth = ref<string>('0px')
  const borderColor = ref<string>('rgb(163, 163, 163)')

  function setDropzoneNormal(): void {
    borderWidth.value = '0px'
    borderColor.value = 'rgb(163, 163, 163)'
    setGateDisplay(props.gate, Display.Default)
  }

  function setDropzoneFocussed(): void {
    borderWidth.value = '2px'
    borderColor.value = 'rgb(163, 163, 163)'
    setGateDisplay(props.gate, Display.Focussed)
  }

  function setDropzoneSelected(): void {
    borderWidth.value = '2px'
    borderColor.value = 'rgb(168, 85, 247)'
    setGateDisplay(props.gate, Display.Selected)
  }

  function setDropzoneGrabbed(): void {
    borderWidth.value = '0px'
    borderColor.value = 'rgb(163, 163, 163)'
    setGateDisplay(props.gate, Display.Grabbed)
  }

  function isDropzoneSelected(): boolean {
    return props.gate.display == Display.Selected
  }

  function mouseEventEnable(): boolean {
    if (isGateValid(props.gate) && !isGateValid(props.gateDragging)) {
      return true
    } else {
      return false
    }
  }

  function mouseover(): void {
    if (mouseEventEnable() && !isDropzoneSelected()) {
      setDropzoneFocussed()
    }
  }

  function mouseleave() {
    if (mouseEventEnable() && !isDropzoneSelected()) {
      setDropzoneNormal()
    }
  }

  function mousedown() {
    if (isGateInCircuitDropzone(props.gate)) {
      emitter.emit('mousedownCircuitDropzone', props.gate)
    }
    emitter.emit('setDropzoneNormal')
    if (mouseEventEnable()) {
      emitter.emit('appendRegister')
      if (isGateInCircuitDropzone(props.gate)) {
        setDropzoneGrabbed()
      }
      if (isGateInCircuitDropzone(props.gate)) {
        setGateValue(props.gateDragging, props.gate)
      } else {
        initGateBlank(props.gateDragging, props.gate.name, props.gate.value)
      }
    }
  }

  function mouseup() {
    if (isGateValid(props.gate) && isGateInCircuitDropzone(props.gate)) {
      setDropzoneSelected()
    }
  }

  emitter.on('setDropzoneNormal', () => setDropzoneNormal())
</script>

<template>
  <div class="circuit-dropzone">
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
      :class="gate.name == 'Null' ? 'z-0' : 'z-10'"
      @mouseover="mouseover"
      @mouseleave="mouseleave"
      @mousedown="mousedown"
      @mouseup="mouseup"
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
  .circuit-dropzone {
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
    cursor: v-bind("props.gate.name == 'Null' ? 'default' : 'grab'");
    border-width: v-bind("gate.display == Display.Focussed || gate.display == Display.Selected ? '2px' : '0'");
    border-style: solid;
    border-color: v-bind("gate.display === Display.Selected ? 'rgb(168, 85, 247)' : 'rgb(163, 163, 163)'");
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circuit-wires {
    position: absolute;
  }
</style>
