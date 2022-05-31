<script setup lang="ts">
import { emitter } from './Emitter'
import { Gate, isGateValid, initCircuit, isGateInCircuitDropzone, initGateBlank } from './Gate'
import CircuitStep from './CircuitStep.vue'

const props = defineProps<{ circuit: Gate[][], gateDragging: Gate }>()

function mouseleave() {
    if (isGateValid(props.gateDragging)) {
        emitter.emit('removeCircuitDropzone')
        if (isGateValid(props.gateDragging) && isGateInCircuitDropzone(props.gateDragging)) {
            initGateBlank(props.gateDragging, props.gateDragging.name, props.gateDragging.value)
        }
    }
}
</script>

<template>
    <div class="circuit-board-container">
        <div class="circuit-board" @mouseleave="mouseleave">
            <CircuitStep :step="step" v-for="step in circuit" :gate-dragging="gateDragging" />
        </div>
    </div>
</template>

<style scoped>

.circuit-board {
    margin: 60px 10px 10px 10px;
    border: 0px solid green;
    display: flex;
    flex-direction: row;
}
</style>
