<script
  setup
  lang="ts"
>
  import { Check, Close } from '@element-plus/icons-vue'
  import { ElTable } from 'element-plus'
  import { ref, reactive } from 'vue'
  import { connected } from './server/Server'
  import { circuitGates, loadCircuitFromString } from './store/Circuit'

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

  function handleImport(): void {
    circuitItems.push({
      index: circuitItems.length,
      name: `Circuit${circuitItems.length}`,
      circuit: JSON.stringify(circuitGates)
    })
  }

  function handleLoad(): void {
    if (currentCircuitItem.value.index >= 0) {
      loadCircuitFromString(JSON.stringify(currentCircuitItem.value.circuit))
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
  <div class="circuit-editor">
    <el-table
      ref="circuitTable"
      :data="circuitItems"
      height="300"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column
        prop="name"
        label="Circuit"
      />
    </el-table>
    <div style="margin-top: 1rem">
      <el-form
        :inline="true"
        @submit.prevent
      >
        <el-form-item label="">
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
        <el-form-item>
          <el-button
            type="info"
            size="small"
            @click="handleImport"
            >Import
          </el-button>
          <el-button
            type="info"
            size="small"
            @click=""
            >Export
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            @click="handleLoad"
            >Load Selected Circuit
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            @click="handleSave"
            >Save Current Circuit
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
  .circuit-editor {
    display: flex;
    flex-direction: column;
    width: 15rem;
  }
</style>
