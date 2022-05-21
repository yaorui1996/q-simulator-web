<script setup lang="ts">
import { ref, reactive } from 'vue'
import { QCircuitOperation, operationEqual } from './QCircuitOperation';
import QCircuitOperationElement from './QCircuitOperationElement.vue';

const props = defineProps<{
  qCircuitOperationList: QCircuitOperation[]
  qCircuitOperationChosen: QCircuitOperation
  qCircuitOperationFocus: QCircuitOperation
}>()
const emit = defineEmits<{
  (event: 'qCircuitOperationDraggingSet', show: boolean): void
}>()

const qCircuitRegisterNUm = ref<number>(3)
const qCircuitStepNum = ref<number>(4)
const qCircuitBoard = ref<HTMLElement>()
const qCircuit = ref<HTMLElement>()

function qCircuitOperationRemove(operationTarget: QCircuitOperation) {
  const index = props.qCircuitOperationList.findIndex((operation: QCircuitOperation) => operationEqual(operationTarget, operation))
  if (index !== -1) {
    props.qCircuitOperationList[index].gateName = "NULL"
  }
}
function mousedownBoard(operation: QCircuitOperation) {
  if (operation.gateName !== 'NULL') {
    Object.assign(props.qCircuitOperationChosen, {
      x: 0,
      y: 0,
      i: 0,
      gateName: operation.gateName
    })
    qCircuitOperationRemove(operation)
    emit('qCircuitOperationDraggingSet', true)
  }
}
function mouseoverBoard(operation: QCircuitOperation) {
  if (operation.gateName == 'NULL' && props.qCircuitOperationChosen.gateName !== 'NULL') {
    qCircuitOperationRemove(props.qCircuitOperationFocus)
    props.qCircuitOperationFocus.x = operation.x
    props.qCircuitOperationFocus.y = operation.y
    props.qCircuitOperationFocus.i = operation.i
    props.qCircuitOperationFocus.gateName = props.qCircuitOperationChosen.gateName
    operation.gateName = props.qCircuitOperationChosen.gateName
    emit('qCircuitOperationDraggingSet', false)
  }
}
function mouseleaveBoard(operation: QCircuitOperation) {
  if (operationEqual(props.qCircuitOperationFocus, operation)) {
    qCircuitOperationRemove(props.qCircuitOperationFocus)
  }
  if (props.qCircuitOperationChosen.gateName !== 'NULL') {
    emit('qCircuitOperationDraggingSet', true)
  }
}
</script>

<template>
  <div class="q-circuit" ref="qCircuit">
    <div class="q-circuit-board" ref="qCircuitBoard">
      <div class="q-circuit-board-background wrapper">
        <div
          :style="{ 'position': 'relative', 'grid-row-start': 1, 'grid-column-start': 1, 'grid-column-end': qCircuitStepNum + 1 }">
          <div class="q-circuit-register-wire"></div>
        </div>
        <div
          :style="{ 'position': 'relative', 'grid-row-start': 2, 'grid-column-start': 1, 'grid-column-end': qCircuitStepNum + 1 }">
          <div class="q-circuit-register-wire"></div>
        </div>
        <div
          :style="{ 'position': 'relative', 'grid-row-start': 3, 'grid-column-start': 1, 'grid-column-end': qCircuitStepNum + 1 }">
          <div class="q-circuit-register-wire"></div>
        </div>
      </div>
      <div class="q-circuit-board-foreground wrapper">
        <div class="q-circuit-board-operation" v-for="operation in qCircuitOperationList"
          :style="{ 'grid-column-start': operation.x, 'grid-row-start': operation.y }"
          @mousedown="mousedownBoard(operation)" @mouseover="mouseoverBoard(operation)"
          @mouseleave="mouseleaveBoard(operation)">
          <QCircuitOperationElement :gateName='operation.gateName' />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-circuit {
  position: relative;
  width: 500px;
  height: 600px;
  /* background: black; */
  padding: 10px 0 0 10px;
  /* border: 2px solid black; */
}

.q-circuit-board-background {

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.q-circuit-board-foreground {

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.wrapper {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(v-bind(qCircuitStepNum), 40px);
  grid-template-rows: repeat(v-bind(qCircuitRegisterNUm), 40px);
  grid-gap: 5px;
}

.q-circuit-register-wire {
  position: relative;
  top: calc(50% - 1px);
  width: 100%;
  height: 2px;
  background-color: black;
}

.q-circuit-board {
  position: relative;
  width: 200px;
  height: 200px;
}

.q-circuit-board-operation {
  position: relative;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border: 2px solid gray;
  border-radius: 4px;
  cursor: grab;
  background-color: white;
}
</style>
