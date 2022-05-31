<script setup lang="ts">
import { ref, reactive } from 'vue'
import { emitter } from './Emitter'
import { Display, Gate, getGateID, isGateInBlankDropzone, getStepNum, getRegisterNum, initPalette, initCircuit, arrangeCircuit, initGateBlank, isGateValid, isGateInCircuitDropzone, isCircuitEqual, arrangeRegister, appendRegister, removeRegister } from './Gate'
import CircuitBoard from './CircuitBoard.vue'
import CircuitPalette from './CircuitPalette.vue'
import Dropzone from './Dropzone.vue'

const stepMin: number = 4
const stepMax: number = 10
const registerMin: number = 3
const registerMax: number = 6

const palette = ref<Gate[]>([])
initPalette(palette.value)

const circuit = ref<Gate[][]>([])
initCircuit(circuit.value, stepMin, registerMin)

const gateDragging = ref<Gate>({
    step: -1,
    register: -1,
    name: 'Null',
    value: '',
    display: Display.Default,
    wireInput: false,
    wireOutput: false,
    connectTop: false,
    connectBottom: false
})

const x = ref<string>('0')
const y = ref<string>('0')

circuit.value[0][1].name = 'PauliX'
circuit.value[1][0].name = 'PauliX'
circuit.value[1][1].name = 'PauliY'
circuit.value[2][1].name = 'PauliX'
arrangeCircuit(circuit.value, stepMin, registerMin)

emitter.on('appendRegister', () => appendRegister(circuit.value))

emitter.on('removeCircuitDropzone', () => {
    if (isGateInCircuitDropzone(gateDragging.value)) {
        let step: number = gateDragging.value.step
        let register: number = gateDragging.value.register
        circuit.value[step][register].name = 'Null'
        circuit.value[step][register].display = Display.Default
    }
})

emitter.on('setCircuitDropzone', (gate: Gate) => {
    let step: number = gate.step
    let register: number = gate.register
    circuit.value[step][register].name = gateDragging.value.name
    circuit.value[step][register].display = Display.Grabbed
    circuit.value[step][register].value = gateDragging.value.value
    gateDragging.value.step = gate.step
    gateDragging.value.register = gate.register
})

function mousemove(event: MouseEvent) {
    x.value = (event.pageX - 34 / 2) + 'px'
    y.value = (event.pageY - 34 / 2) + 'px'
}

let mousedownCircuitDropzone = {
    step: 0,
    register: 0
}

emitter.on('mousedownCircuitDropzone', (gate: Gate) => {
    mousedownCircuitDropzone.step = gate.step
    mousedownCircuitDropzone.register = gate.register
})

function mouseup(event: MouseEvent) {
    emitter.emit('setDropzoneNormal')
    if (mousedownCircuitDropzone.step == gateDragging.value.step && mousedownCircuitDropzone.register == gateDragging.value.register) {
        circuit.value[mousedownCircuitDropzone.step][mousedownCircuitDropzone.register].display = Display.Selected
    }
    initGateBlank(gateDragging.value, 'Null', '')
    // removeRegister(circuit.value)
    let circuitRaw: Gate[][] = JSON.parse(JSON.stringify(circuit.value))
    arrangeCircuit(circuit.value, stepMin, registerMin)
}
</script>

<template>
    <div class="circuit" @mousemove="mousemove" @mouseup="mouseup">
        <CircuitPalette class="circuit-palette" :palette="palette" :gate-dragging="gateDragging" />
        <CircuitBoard class="circuit-board" :circuit="circuit" :gate-dragging="gateDragging" />
        <div class="blank-dropzone-container" style="position: absolute">
            <Dropzone class="blank-dropzone" :gate="gateDragging" :gate-dragging="gateDragging"
                v-if="isGateInBlankDropzone(gateDragging) && isGateValid(gateDragging)" />
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
    cursor: v-bind("gateDragging.name == 'Null' ? 'default' : 'grab'")
}

.blank-dropzone-container {
    position: absolute;
    width: 38px;
    height: 38px;
    left: v-bind(x);
    top: v-bind(y);
    pointer-events: none;
}

.blank-dropzone {
    position: absolute;
}

.circuit-palette {
    position: relative;
    border: 0px solid red;
}

.circuit-board {
    position: relative;
}
</style>
