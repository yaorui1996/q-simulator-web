<script setup lang="ts">

// TypeScript enabled
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  gateName: { type: String, required: true },
})


</script>

<template>

  <div id="palette-dropzone">
    <component :is="defineAsyncComponent(()=>import('./icons/'+props.gateName+'-gate.vue'))" />
  </div>


</template>

<style scoped>

#palette-dropzone {
    height: 2rem;
    width: 2rem;
    display: inline-block;
    position: static;
}

</style>
