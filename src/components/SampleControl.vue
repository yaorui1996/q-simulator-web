<script
  setup
  lang="ts"
>
  import { Check, Close } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue'
  import { getEncodedCircuit } from './server/Encoder'
  import { connected, sendRequest } from './server/Server'
  import {
    getCircuitGatesErrorNum,
    checkingCircuitGatesError
  } from './store/Circuit'

  const elMessage = ref<HTMLElement>()

  const sampleNum = ref<number>(1)

  function click() {
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
      console.clear()
      console.log(JSON.stringify(getEncodedCircuit(), undefined, 2))
    } else {
      checkingCircuitGatesError.value = false
      // ws.send(
      //   JSON.stringify({
      //     request: {
      //       time: true,
      //       submitCircuit: false,
      //       acquireResult: false
      //     }
      //   })
      // )
      sendRequest()
    }
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
      <el-form-item label="">
        <el-input-number
          v-model="sampleNum"
          :controls="false"
          :precision="0"
          :step="1"
          :min="1"
          :max="1000"
          @change=""
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          round
          @click="click"
          style="font-size: var(--el-font-size-medium)"
          >Sample
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
