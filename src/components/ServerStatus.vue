<script
  setup
  lang="ts"
>
  import { Check, Close } from '@element-plus/icons-vue'
  import { connected } from './server/Server'
</script>

<template>
  <div>
    <el-tooltip
      effect="light"
      placement="bottom"
    >
      <template #content>
        <span style="font-size: var(--el-font-size-small)">Server Status</span>
      </template>
      <el-button
        :type="connected ? 'success' : 'danger'"
        :icon="connected ? 'Check' : 'Close'"
        circle
      />
    </el-tooltip>
  </div>
</template>

<style scoped>
  div {
    position: absolute;
    top: 3rem;
    right: 3rem;
    display: flex;
    flex-direction: row;
  }
</style>
