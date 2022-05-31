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
        <path d="M15 24H33M24 15V33" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
</template>

<style scoped>
svg {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    background-color: v-bind("display == Display.Grabbed ? 'rgb(168, 85, 247)' : 'rgb(16, 185, 129)'");
    border-radius: 9999rem;
}
</style>
