<script setup lang="ts">
import { ref, reactive } from 'vue'
import { QCircuitOperation } from './QCircuitOperation';
import QCircuitOperationElement from './QCircuitOperationElement.vue';
import QCircuitPalette from './QCircuitPalette.vue'
import QCircuitBoard from './QCircuitBoard.vue'

const qSimulator = ref<HTMLElement>()
const qCircuitRegisterNUm = ref<number>(3)
const qCircuitStepNum = ref<number>(4)
const qCircuitOperationList = reactive<QCircuitOperation[]>([])
const qCircuitOperationChosen = ref<QCircuitOperation>({ x: 0, y: 0, i: 0, gateName: 'NULL' })
const qCircuitOperationFocus = ref<QCircuitOperation>({ x: 0, y: 0, i: 0, gateName: 'NULL' })
for (let y = 1; y <= qCircuitRegisterNUm.value; y++) {
  for (let x = 1; x <= qCircuitStepNum.value; x++) {
    qCircuitOperationList.push({ x: x, y: y, i: (y - 1) * qCircuitStepNum.value + (x - 1), gateName: 'NULL' })
  }
}

const qCircuitOperationDragging = ref<boolean>(false)
const qCircuitOperationDraggingMovement = ref<{ x: number, y: number }>({ x: 0, y: 0 })
const qCircuitOperationDraggingSet = function (show: boolean) {
  qCircuitOperationDragging.value = show
}

function mousemoveSimulator(event: MouseEvent) {
  if (event.x - qSimulator.value.getBoundingClientRect().x >= 0 &&
    event.x - qSimulator.value.getBoundingClientRect().x <= 300 &&
    event.y - qSimulator.value.getBoundingClientRect().y >= 0 &&
    event.y - qSimulator.value.getBoundingClientRect().y <= 300) {
    qCircuitOperationDraggingMovement.value.x = event.x - qSimulator.value.getBoundingClientRect().x
    qCircuitOperationDraggingMovement.value.y = event.y - qSimulator.value.getBoundingClientRect().y
  }
}
function mouseupSimulator(event: MouseEvent) {
  qCircuitOperationDraggingSet(false)
  Object.assign(qCircuitOperationFocus.value, { x: 0, y: 0, i: 0, gateName: 'NULL' })
  Object.assign(qCircuitOperationChosen.value, { x: 0, y: 0, i: 0, gateName: 'NULL' })
  console.clear()
  qCircuitOperationList.forEach(function (operation: QCircuitOperation) {
    if (operation.gateName !== 'NULL') {
      console.log(operation.x, operation.y, operation.gateName)
    }
  })
}
</script>

<template>
  <div class="q-simulator" ref="qSimulator" @mousemove="mousemoveSimulator" @mouseup="mouseupSimulator">
    <QCircuitPalette :qCircuitOperationChosen=qCircuitOperationChosen
      @qCircuitOperationDraggingSet="qCircuitOperationDraggingSet" />
    <QCircuitBoard :qCircuitOperationChosen=qCircuitOperationChosen :qCircuitOperationList=qCircuitOperationList
      :qCircuitOperationFocus=qCircuitOperationFocus @qCircuitOperationDraggingSet="qCircuitOperationDraggingSet" />
    <QCircuitOperationElement class="q-circuit-operation-dragging" :gateName="qCircuitOperationChosen.gateName"
      v-if="qCircuitOperationDragging" />
  </div>
</template>

<style scoped>
.q-simulator {
  -webkit-touch-callout: none;
  /*系统默认菜单被禁用*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -khtml-user-select: none;
  /*早期浏览器*/
  -moz-user-select: none;
  /*火狐*/
  -ms-user-select: none;
  /*IE10*/
  user-select: none;
  position: relative;
  padding: 20px 0 0 20px;
  width: 300px;
  height: 300px;
  background-color: rgb(249 250 251);

}

.q-circuit-operation-dragging {
  position: absolute;
  top: v-bind((qCircuitOperationDraggingMovement.y - 0) + "px");
  left: v-bind((qCircuitOperationDraggingMovement.x - 0) + "px");
  cursor: grab;
  pointer-events: none
}
</style>
