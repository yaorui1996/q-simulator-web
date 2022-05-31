<script setup lang="ts">
import { Display } from '../Gate'

defineProps<{
    value: string,
    display: Display,
    inCircuitDropzone: boolean
}>()
</script>

<template>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 10V40M34 10L40 24L34 40" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
    <div class="value">{{value}}</div>
</template>

<style scoped>
svg {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    color: v-bind("display == Display.Grabbed ? 'rgb(255, 255, 255)' : 'rgb(115, 115, 115)'");
    background-color: v-bind("display == Display.Grabbed ? 'rgb(168, 85, 247)' : 'rgb(249, 250, 251)'");
}

.value {
    position: absolute;
    display: flex;
    justify-content: center;
    color: v-bind("display == Display.Grabbed ? 'rgb(255, 255, 255)' : value == '0' ? 'rgb(239, 68, 68)' : 'rgb(59, 130, 246)'");
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>
