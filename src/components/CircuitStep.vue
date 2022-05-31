<script setup lang="ts">
import { emitter } from './Emitter'
import { Display, Gate, isGateEqual, isGateInCircuitDropzone, isGateValid, setGateName, setGateValue } from './Gate'
import Dropzone from './Dropzone.vue'

const props = defineProps<{ step: Gate[], gateDragging: Gate }>()

function mousemove(event: MouseEvent, gate: Gate) {
    if (isGateValid(props.gateDragging)) {
        if (!isGateValid(gate)) {
            emitter.emit('removeCircuitDropzone')
            emitter.emit('setCircuitDropzone', {
                step: gate.step,
                register: gate.register,
                name: 'Null',
                value: '',
                display: Display.Default,
                wireInput: false,
                wireOutput: false,
                connectTop: false,
                connectBottom: false
            })
        } else if (isGateValid(gate) && !isGateEqual(gate, props.gateDragging)) {
            if (event.offsetX < 30 / 2 && !(props.gateDragging.step == gate.step - 1 && props.gateDragging.register == gate.register)) {
                emitter.emit('removeCircuitDropzone')
                emitter.emit('setCircuitDropzone', {
                    step: gate.step - 1,
                    register: gate.register,
                    name: 'Null',
                    value: '',
                    display: Display.Default,
                    wireInput: false,
                    wireOutput: false,
                    connectTop: false,
                    connectBottom: false
                })
            } else if (event.offsetX >= 30 / 2 && !(props.gateDragging.step == gate.step + 1 && props.gateDragging.register == gate.register)) {
                emitter.emit('removeCircuitDropzone')
                emitter.emit('setCircuitDropzone', {
                    step: gate.step + 1,
                    register: gate.register,
                    name: 'Null',
                    value: '',
                    display: Display.Default,
                    wireInput: false,
                    wireOutput: false,
                    connectTop: false,
                    connectBottom: false
                })
            }
        }
    }
}
</script>

<template>
    <div class="circuit-step">
        <div class="circuit-dropzone-container" v-for="gate in step" @mousemove="mousemove($event, gate)">
            <Dropzone :gate="gate" :gate-dragging="gateDragging" />
        </div>
    </div>
</template>

<style scoped>
.circuit-step {
    border: 0px solid blue;
    display: flex;
    flex-direction: column;
}

.circuit-dropzone-container {
    height: 48px;
    width: 24px;
    border: 0px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
