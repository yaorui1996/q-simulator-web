<script
  setup
  lang="ts"
>
  import { Check, Close, Delete } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue'
  import { getEncodedCircuit } from './server/Encoder'
  import { connected, sendRequest, ws } from './server/Server'
  import { options, selected } from './store/Chart'
  import {
    getCircuitGatesErrorNum,
    checkingCircuitGatesError,
    circuitGates,
    trimCircuit
  } from './store/Circuit'
  import { refillArray } from './utils/Array'

  const elMessage = ref<HTMLElement>()

  const sampleNum = ref<number>(2)

  function handleClickRun() {
    const errorNum: number = getCircuitGatesErrorNum()
    if (errorNum > 0) {
      checkingCircuitGatesError.value = true
      ElMessage({
        showClose: true,
        message:
          getCircuitGatesErrorNum() > 1
            ? `Oops, there are ${getCircuitGatesErrorNum()} errors in the circuit.`
            : `Oops, there is 1 error in the circuit.`,
        type: 'error',
        grouping: true,
        appendTo: elMessage.value
      })
    } else {
      checkingCircuitGatesError.value = false
      sendRequest()
      refillArray(options, ['State Vector', 'Probability'])
      if (selected.value == 'Sampling Distribution') {
        selected.value = 'State Vector'
      }
    }
  }

  function handleClickSample() {
    const errorNum: number = getCircuitGatesErrorNum()
    if (errorNum > 0) {
      checkingCircuitGatesError.value = true
      ElMessage({
        showClose: true,
        message:
          getCircuitGatesErrorNum() > 1
            ? `Oops, there are ${getCircuitGatesErrorNum()} errors in the circuit.`
            : `Oops, there is 1 error in the circuit.`,
        type: 'error',
        grouping: true,
        appendTo: elMessage.value
      })
    } else {
      checkingCircuitGatesError.value = false
      sendRequest(sampleNum.value)
      refillArray(options, ['Sampling Distribution'])
      selected.value = 'Sampling Distribution'
    }
  }

  function handleClear(): void {
    circuitGates.splice(1, circuitGates.length - 1)
    trimCircuit()
  }
</script>

<template>
  <div>
    <div
      ref="elMessage"
      style="pointer-events: none"
    ></div>
    <el-form
      :inline="true"
      @submit.prevent
    >
      <el-form-item>
        <el-button
          type="success"
          round
          @click="handleClickRun"
          style="font-size: var(--el-font-size-medium)"
          >Run
        </el-button>
        <el-tooltip
          effect="light"
          placement="bottom"
        >
          <template #content>
            <span style="font-size: var(--el-font-size-small)"
              >Reset circuit</span
            >
          </template>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            @click="handleClear"
          />
        </el-tooltip>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      @submit.prevent
    >
      <el-form-item label="">
        <el-input-number
          v-model="sampleNum"
          :controls="false"
          :precision="0"
          :step="1"
          :min="2"
          :max="1000"
          @change=""
          style="width: 5rem"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          round
          @click="handleClickSample"
          style="font-size: var(--el-font-size-medium)"
          >Sample
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
