<script setup lang="ts">
import { ref, reactive } from 'vue'
import { QCircuitOperation } from './QCircuitOperation'
import QCircuitOperationElement from './QCircuitOperationElement.vue';
import PaletteDropzone from './PaletteDropzone.vue';

const props = defineProps<{
  qCircuitOperationChosen: QCircuitOperation
}>()
const emit = defineEmits<{
  (event: 'qCircuitOperationDraggingSet', show: boolean): void
}>()

const paletteOperations = reactive<QCircuitOperation[]>([])
paletteOperations.push({ 'x': 1, 'y': 1, 'i': 0, 'gateName': 'H' })
paletteOperations.push({ 'x': 2, 'y': 1, 'i': 1, 'gateName': 'X' })
paletteOperations.push({ 'x': 3, 'y': 1, 'i': 2, 'gateName': 'Y' })
paletteOperations.push({ 'x': 4, 'y': 1, 'i': 3, 'gateName': 'Z' })

function mousedownPalette(operation: QCircuitOperation) {
  Object.assign(props.qCircuitOperationChosen, {
    x: 0,
    y: 0,
    i: 0,
    gateName: operation.gateName
  })
  emit('qCircuitOperationDraggingSet', true)
}
</script>

<template>
  <div class="q-circuit-palette">
    <div class="wrapper">
      <PaletteDropzone v-for="operation in ['h', 'x', 'y', 'z']" :gateName="operation" />
      <div class="q-circuit-palette-operation" v-for="operation in paletteOperations"
        :style="{ 'grid-column-start': operation.x, 'grid-row-start': operation.y }"
        @mousedown="mousedownPalette(operation)">
        <QCircuitOperationElement :gateName='operation.gateName' />
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-circuit-palette {
  width: 200px;
  height: 60px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid black; */
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(v-bind(paletteOperations.length), 40px);
  grid-template-rows: 40px;
  grid-gap: 5px;
}

.q-circuit-palette-operation {
  position: relative;
  border: 2px solid gray;
  border-radius: 4px;
  cursor: grab;
}
</style>
