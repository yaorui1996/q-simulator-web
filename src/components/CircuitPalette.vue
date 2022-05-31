<script setup lang="ts">
import { Gate } from './Gate'
import Dropzone from './Dropzone.vue'

defineProps<{ palette: Gate[], gateDragging: Gate }>()
</script>

<template>
    <div class="circuit-palette-container">
        <div class="circuit-palette rounded-bl-2xl rounded-tr-md bg-white drop-shadow-xl">
            <div class="palette-dropzone-container" v-for="gate in palette">
                <Dropzone :gate="gate" :gate-dragging="gateDragging" />
            </div>
        </div>
    </div>
</template>

<style scoped>

.circuit-palette {
    margin: 20px 0 0 10px;
    padding: 10px 10px 10px 10px;
    border: 2px solid rgb(229, 231, 235);
    border-radius: 12px;
    display: flex;
    flex-direction: row;
}
.palette-dropzone-container {
    height: 34px;
    width: 34px;
    margin: 3px 3px 3px 3px;
    border: 0px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
