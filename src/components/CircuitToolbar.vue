<script
  setup
  lang="ts"
>
  import { Check, Close } from '@element-plus/icons-vue'
  import { ElMessage, ElTable, UploadFile, UploadRawFile } from 'element-plus'
  import { ref, reactive } from 'vue'
  import exportFromJSON from 'export-from-json'

  import { connected } from './server/Server'
  import {
    circuitGates,
    getCircuitGatesErrorNum,
    loadCircuitFromString,
    trimCircuit
  } from './store/Circuit'
  import { Gate, GateName } from './Gate'

  const elMessage = ref<HTMLElement>()

  interface CircuitItem {
    index: number
    name: string
    circuit: string
  }

  const circuitTable = ref<InstanceType<typeof ElTable>>()
  const circuitItems = reactive<CircuitItem[]>([])
  const currentCircuitItem = ref<CircuitItem>({
    index: -1,
    name: '',
    circuit: ''
  })

  function handleCurrentChange(currentRow: CircuitItem | undefined): void {
    if (currentRow) {
      currentCircuitItem.value = currentRow
    }
  }

  function handleRemove(): void {
    circuitTable.value?.setCurrentRow(undefined)
    if (currentCircuitItem.value.index >= 0) {
      circuitItems.splice(currentCircuitItem.value.index, 1)
      currentCircuitItem.value.index = -1
    }
    circuitItems.forEach((item, index) => (item.index = index))
  }

  function onUploadChange(file: UploadFile): void {
    let reader = new FileReader()
    reader.readAsText(file.raw as UploadRawFile)
    reader.onload = () => {
      const circuit: string = JSON.stringify(
        JSON.parse(reader.result as string)
      )
      if (
        JSON.parse(circuit)
          .flat()
          .some((gate: any) => !(gate.name in GateName))
      ) {
        ElMessage({
          showClose: true,
          message: 'Error, invalid circuit.',
          type: 'error',
          grouping: true,
          appendTo: elMessage.value
        })
      } else {
        circuitItems.push({
          index: circuitItems.length,
          name: file.name.replace('.json', ''),
          circuit: circuit
        })
      }
    }
  }

  function handleExport(): void {
    if (currentCircuitItem.value.index >= 0) {
      exportFromJSON({
        data: JSON.parse(currentCircuitItem.value.circuit),
        fileName: currentCircuitItem.value.name,
        exportType: exportFromJSON.types.json
      })
    }
  }

  function handleLoad(): void {
    if (currentCircuitItem.value.index >= 0) {
      loadCircuitFromString(currentCircuitItem.value.circuit)
    }
  }

  function handleSave(): void {
    circuitItems.push({
      index: circuitItems.length,
      name: `Circuit${circuitItems.length}`,
      circuit: JSON.stringify(circuitGates)
    })
  }
</script>

<template>
  <div
    ref="elMessage"
    style="pointer-events: none"
  ></div>
  <div class="circuit-editor">
    <el-table
      ref="circuitTable"
      :data="circuitItems"
      height="200"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column
        prop="name"
        label="Circuit"
      />
    </el-table>
    <el-form
      :inline="true"
      @submit.prevent
      style="margin-top: 1rem"
    >
      <el-form-item>
        <el-input
          v-model="currentCircuitItem.name"
          size="small"
          style="width: 6rem"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          size="small"
          @click="handleRemove"
          >Remove
        </el-button>
      </el-form-item>
    </el-form>
    <el-upload
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onUploadChange"
    >
      <template #trigger>
        <el-button
          type="info"
          size="small"
          >Import
        </el-button>
      </template>
      <el-button
        type="info"
        size="small"
        @click="handleExport"
        style="margin-left: 1rem"
        >Export
      </el-button>
    </el-upload>
    <el-form
      :inline="true"
      style="margin-top: 1rem"
      @submit.prevent
    >
      <el-form-item>
        <el-button
          type="success"
          @click="handleLoad"
          >Load Selected
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          @click="handleSave"
          >Save Current
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
  .circuit-editor {
    display: flex;
    flex-direction: column;
    width: 15rem;
  }
</style>
