<script
  setup
  lang="ts"
>
  import { Check, Close } from '@element-plus/icons-vue'
  import { ElTable } from 'element-plus'
  import { ref, reactive } from 'vue'
  import { connected } from './server/Server'

  interface circuitName {
    index: number
    name: string
  }

  const circuitTable = ref<InstanceType<typeof ElTable>>()
  const circuitNames = reactive<circuitName[]>([])
  const currentCircuitName = ref<circuitName>({ index: -1, name: '' })

  function handleCurrentChange(currentRow: circuitName | undefined): void {
    if (currentRow) {
      currentCircuitName.value = currentRow
    }
  }

  function handleRemove(): void {
    circuitTable.value?.setCurrentRow(undefined)
    if (currentCircuitName.value.index >= 0) {
      circuitNames.splice(currentCircuitName.value.index, 1)
      currentCircuitName.value.index = -1
    }
    circuitNames.forEach((item, index) => (item.index = index))
  }

  function handleImport(): void {
    circuitNames.push({
      index: circuitNames.length,
      name: '2016-05-3'
    })
  }
</script>

<template>
  <div class="circuit-editor">
    <el-table
      ref="circuitTable"
      :data="circuitNames"
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
            v-model="currentCircuitName.name"
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
            @click=""
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
